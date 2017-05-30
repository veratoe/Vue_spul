var db = require("../db");

// define model
var Message = module.exports = db.sequelize.define("message", 
    {
        message: db.Sequelize.STRING,
        owner: db.Sequelize.ENUM('user', 'script', 'system'),
        star: db.Sequelize.BOOLEAN
    },
    {
        hooks: {
            afterCreate (instance, options) {
                Message
                    .findById(instance.dataValues.id, 
                        { include: [
                            { model: User, attributes: ['username'] },
                            { model: Script, attributes: ['name' ] }
                        ]
                    })
                    .then(m => {
                        Mutation.create({
                            type: "CREATE_MESSAGE",
                            values: m.dataValues                                         
                        });
                    });
                

            },
            afterUpdate (instance, options) {
                Mutation.create({
                    type: "UPDATE_MESSAGE",
                    values: instance.dataValues,                                         
                    previousValues: instance._previousValues,
                    changed: instance._changed
                });

            }
        }
    }
);

var router = require("../router.js");
var Thread = require("./thread.js");
var Mutation = require("./mutation.js");
var User = require("./user.js");
var Script = require("./script.js");

Message.belongsTo(User);
Message.belongsTo(Script);

Message.Instance.prototype.addStar = function () {

    this.getUser().then(u => {
    
        this
            .update({ star: true })
            .then(m => {
                Message.create({ message: u.get("username") + " got a star for that", threadId: this.get("threadId"), owner: "system" }); 
            });
    });
};

// REST routes
router.get("/threads/:id/messages", (req, res) => {

    Thread.findById(req.params.id, { include: [ Message ] })
        .then(thread => {
            res.status(200).json(thread.messages);
        });
});

router.post("/threads/:id/messages", (req, res) => {

    if (!req.authenticated) {
        res.status(400).send();
        return;
    }

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread || thread.get("dead")) {  
                res.status(400).send();
                return;
            }

            Message.create({ message: req.body.message, threadId: req.params.id, userId: req.user.id, owner: 'user' })
                .then(m => {
                    res.status(200).json(m);

                    var scripts = thread.getScripts({ where: { runs_left: { $gt: 0 }, active: true }}).then(scripts => {
                        scripts.forEach((script, index) => {
                            script.run(m, req.params.id);                            
                        });

                    }); 
                });
        });

});

