var db = require("../db");
var crypto = require('crypto');

// define model
var User = module.exports = db.sequelize.define("user", 
    {
        username: db.Sequelize.STRING,
        password: db.Sequelize.STRING,
        salt: db.Sequelize.STRING
    },
    {
        hooks: {
        }
    }
);

var router = require("../router.js");
var Message = require("./message.js");

User.hasMany(Message, { as: 'Messages' });

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

    var allowedFields = ['username', 'createdAt', 'updatedAt'];
    var response = {};

    if (req.authenticated) {
        allowedFields.forEach((field) => { response[field] = req.user[field]; });
        res.status(200).json(response);
        return;
    }

    res.status(400).end();

});
