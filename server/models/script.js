var db = require("../db.js");

// define model;
var Script = module.exports = db.sequelize.define("script", {
    script: db.Sequelize.STRING(1024),
    active: db.Sequelize.BOOLEAN
}); 

var Thread = require("./thread.js");
var Message = require("./message.js");
var router = require("../router.js");

Thread.hasMany(Script);

Script.sync();

// routes

router.put("/threads/:thread_id/scripts/:id", (req, res) => {

    Script.findById(req.params.id)
        .then(script => {
            if (!script) {
                res.status(400).send()
                return;
            }
            
            script.update({ script: req.body.script })
                .then(s => {
                    res.status(200).json(s);
                });
        });

});

router.post("/threads/:id/scripts", (req, res) => {

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {
                res.status(400).send()
                return;
            }
            
            Script.create({ script: req.body.script, threadId: thread.get("id") })
                .then(s => {
                    res.status(200).json(s);

                });
        });

});


router.delete("/threads/:thread_id/scripts/:script_id", (req, res) => {

    Script.findById(req.params.script_id)
        .then(s => {
            s.destroy().then(() => {
                res.status(200).end();
            });            
        });
});

Script.Instance.prototype.run = function (message, threadId) {

    var {VM} = require('vm2');
    var vm = new VM({
        sandbox: {
            Promise: null,
            require: null,
            input: message.get("message"),
            timeout: 10,
        }
    });

    vm.run(this.get("script"));

    if (vm._context.output) {
        Message.create({ message: vm._context.output, threadId: threadId });
    }

}
