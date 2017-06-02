var db = require("../db");

// define model
var Thread = module.exports = db.sequelize.define("thread", 
    {
        title: db.Sequelize.STRING,
        dead: db.Sequelize.BOOLEAN,
    },
    {
        hooks: {
            afterCreate (instance, options) {
                Thread
                    .findById(instance.dataValues.id, { include: [
                            { model: User, attributes: ['username'] },
                            { model: Script, attributes: ['name' ] }
                    ]})
                    .then(t => {

                        Mutation.create({
                            type: "CREATE_THREAD",
                            values: t.dataValues                                         
                        });
                    });
            },
            afterUpdate (instance, options) {
                Mutation.create({
                    type: "UPDATE_THREAD",
                    values: instance.dataValues,                                         
                    previousValues: instance._previousValues,
                    changed: instance._changed
                });

            }
        }
    }
);

var router = require("../router.js");
var Message = require("./message");
var Mutation = require("./mutation");
var Script = require("./script");
var User = require("./user");
var Vote = require("./vote");

Thread.hasMany(Message);
Thread.belongsTo(User);


Thread.Instance.prototype.kill = function () {
     
    Message.create({ message: "Thread was killed", threadId: this.get("id"), owner: "system" }); 

    this
        .update({ dead: true })
        .then(() => { console.log("thread %s killed", this.get("id")); });

};

// routes
router.get("/threads", (req, res) => {

    Thread
        .findAll({ include: [ 
            { 
                model: Message, 
                include: [
                    { model: User, attributes: ['username'] }, 
                    { model: Script, attributes: ['name'] }, 
                ]
            },  
            {
                model: Script, 
                attributes: ['id', 'script', 'name', 'active', 'runs_left', 'error_message', 'last_run_time',
                    [db.sequelize.literal('(select count(*) from votes where "scriptId" = "scripts"."id" AND type = \'up\')'), 'upvotes'] 
                ]

            },
            {
                model: User,
                attributes: ['username']
            },

        ]}) 
        .then(threads => {
            res.json({ threads: threads });
        })
        .catch(e => { 
            throw e; 
        });
});

router.post("/threads", (req, res) => {

    if (!req.authenticated) {
        res.status(400).send();
        return;
    }

    Thread
        .create({
            title: req.body.title,
            userId: req.user.id
        })
        .then(thread => {
            res.status(200).json(thread);
        });

});

router.delete("/threads/:id", (req, res) => {

    Thread.findById(req.params.id)
        .then(thread => {
            thread.destroy().then(() => {
                res.status(200).end();
            });
        })
        .catch( () => {
            res.status(404).end();
        });

});

