var db = require("../db");
var crypto = require('crypto');

// define model
var User = module.exports = db.sequelize.define("user", 
    {
        username: db.Sequelize.STRING,
        password: db.Sequelize.STRING,
        salt: db.Sequelize.STRING,
        status: db.Sequelize.ENUM('active', 'timeout')
    },
    {
        hooks: {
            afterCreate (instance, options) {
                User
                    .findById(instance.dataValues.id)
                    .then(m => {
                        Mutation.create({
                            type: "CREATE_USER",
                            values: m.dataValues                                         
                        });
                    });
                

            },
            afterUpdate (instance, options) {
                Mutation.create({
                    type: "UPDATE_USER",
                    values: instance.dataValues,                                         
                    previousValues: instance._previousValues,
                    changed: instance._changed
                });

            }
        }
    }
);

var router = require("../router.js");
var Message = require("./message.js");
var Mutation = require("./mutation.js");
var Thread = require("./thread.js");
var Vote = require("./vote.js");

User.hasMany(Message);
User.hasMany(Vote);
User.hasMany(Thread);

User.Instance.prototype.setTimeout = function (script, threadId) {
    this
        .update({ status: "timeout" })
        .then(m => {
            Message.create({ message: this.get("username") + " was timed-out by " + script.get("name"), threadId: threadId, owner: "system" }); 
        });
};

router.post("/users", (req, res) => {

    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.createHash('sha256').update(salt + req.body.password).digest('hex');

    User
        .create({ username: req.body.username, password: hash, salt: salt })
        .then(u => {
            res.status(200).json(u);
        });

});

router.get("/users/login", (req, res) => {

    var allowedFields = ['username', 'createdAt', 'updatedAt', 'status'];
    var response = {};

    if (req.authenticated) {
        allowedFields.forEach((field) => { response[field] = req.user[field]; });
        res.status(200).json(response);
        return;
    }

    res.status(400).end();

});
