var db = require("../db");

// define model
var Message = module.exports = db.sequelize.define("message", {
    message: db.Sequelize.STRING,
});

var router = require("../router.js");
var Thread = require("./thread.js");

Message.sync();

// REST routes
router.get("/threads/:id/messages", (req, res) => {

    Thread.findById(req.params.id, { include: [ Message ] })
        .then(thread => {
            res.status(200).json(thread.messages);
        });
});

router.post("/threads/:id/messages", (req, res) => {

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {  
                res.status(400).send();
                return;
            }

            Message.create({ message: req.body.message, threadId: req.params.id })
                .then(m => {
                    res.status(200).json(m);

                    var scripts = thread.getScripts().then(scripts => {

                        scripts.forEach((script, index) => {
                            script.run(m, req.params.id);                            
                        });

                    }); 
                });
        });

});

