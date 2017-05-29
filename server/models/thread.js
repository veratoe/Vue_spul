var db = require("../db");

// define model
var Thread = module.exports = db.sequelize.define("thread", {
    title: db.Sequelize.STRING,
    dead: db.Sequelize.BOOLEAN
});

var router = require("../router.js");
var Message = require("./message");
var Script = require("./script");
var User = require("./user");
var Vote = require("./vote");

Thread.hasMany(Message);


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
                attributes: ['id', [db.sequelize.literal(
                    '(select count(*) from votes where "scriptId" = "scripts"."id" AND type = \'up\')'), 'upvotes']] 

            }],
        }) 
        .then(threads => {
            res.json({ threads: threads });
        })
        .catch(e => { 
            throw e; 
        });
});

router.post("/threads", (req, res) => {

    Thread
        .create({
            title: req.body.title
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

