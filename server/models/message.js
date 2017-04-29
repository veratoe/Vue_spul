var db = require("../db");

// define model
var Message = module.exports = db.sequelize.define("message", {
    message: db.Sequelize.STRING,
});

var router = require("../router.js");
var Thread = require("./thread.js");

// define model

Message.sync();

// REST routes
router.get("/threads/:id/messages", (req, res) => {

    Thread.findById(req.params.id, { include: [ Message ] })
        .then(thread => {
            res.status(200).json(thread);
        });
});

router.post("/threads/:id/messages", (req, res) => {

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {  
                res.status(400).send();
                return;
            }

            var m = Message.create({ message: req.body.message, threadId: req.params.id })
                .then(m => {
                    res.status(200).json(m);

                    var scripts = thread.getScripts().then(scripts => {

                        console.log(scripts);
                        scripts.forEach((script, index) => {
                            console.log("script: " + index);
                            var {VM} = require('vm2');
                            var vm = new VM({
                                sandbox: {
                                    input: m.get("message"),
                                    timeout: 1000,
                                }
                            });

                            console.log(script.get("script"));
                            //vm.run("if (message.match(/vuurbal/)) a = 4");
                            vm.run(script.get("script"));

                            if (vm._context.output) {
                                Message.create({ message: vm._context.output, threadId: req.params.id });
                            }
                            
                        });


                    }); 
                });
        });

});

