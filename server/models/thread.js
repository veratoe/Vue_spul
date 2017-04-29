var db = require("../db");

// define model
var Thread = module.exports = db.sequelize.define("thread", {
    title: db.Sequelize.STRING,
});

var router = require("../router.js");
var Message = require("./message");

Thread.hasMany(Message);
Thread.sync();

// routes
router.get("/threads", (req, res) => {

    Thread.findAll({ include: [ Message ] })
        .then(threads => {
            res.json({ threads: threads });
        })
        .catch(e => { 
            throw e; 
        });
});

router.post("/threads", (req, res) => {

    Thread.create({
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

