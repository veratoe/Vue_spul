var db = require("../db");
var router = require("../router.js");

// define model
var Message = module.exports = db.sequelize.define("message", {
    message: db.Sequelize.STRING,
});

var Thread = require("./thread.js");

console.log('message.js: de router: ', router);
console.log("message.js: Thread ", Thread);

//Message.belongsTo(Thread);
Message.sync();

// REST routes
router.get("/threads/:id/messages", (req, res) => {

    console.log('requested messages on thread ', req.params.id);

    Thread.findById(req.params.id, { include: [ Message ] })
        .then(thread => {
            res.status(200).json(thread);
        });
});

router.post("/threads/:id/messages", (req, res) => {


    var t = Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {  
                console.log('thread %s does not exist', req.params.id);
                res.status(400).send();
                return;
            }

            console.log('creating message on thread %s => %s', req.params.id, req.body.message);
            var m = Message.create({ message: req.body.message })
                .then(m => {

            console.log("created message: ", m);
            thread.addMessages(m)
                console.log("Saved message ", m.get("id"));
                res.status(200).send();
            });
        });


});
