var db = require("../db.js");

// define model;
var Script = module.exports = db.sequelize.define("script", 
    {
        script: db.Sequelize.STRING(1024),
        active: db.Sequelize.BOOLEAN,
        runs_left: db.Sequelize.INTEGER
    }, 
    {
        hooks: {
            afterUpdate (instance, options, fn) {
                console.log(instance);
                Mutation.create({ 
                    type: "UPDATE_SCRIPT",
                    values: instance.dataValues,
                    previousValues: instance._previousValues,
                    changed: instance._changed
                });
            },
        }
    }
); 

var Thread = require("./thread.js");
var Message = require("./message.js");
var Mutation = require("./mutation.js");
var router = require("../router.js");

Thread.hasMany(Script);

Script.sync();

// routes

router.get("/threads/:id/scripts/", (req, res) => {

    Script.findAll({ where: { threadId : req.params.id }})
        .then(scripts => {
            res.status(200).json(scripts);
        });
});

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
            
            Script.create({ 
                script: req.body.script, 
                threadId: thread.get("id"),
                runs_left: 10,
                active: true
            })
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

// hooks
//
    //
// instance methods
Script.Instance.prototype.run = function (message, threadId) {

    var {VM} = require('vm2');
    var vm = new VM({
        timeout: 10,
        sandbox: {
            Promise: null,
            require: null,
            input: message.get("message"),
            inputId: message.get("id"),
        }
    });

    console.log('running script %s', this.get("id"));
    try {
        vm.run(this.get("script"));
        this.update({ 'runs_left': this.runs_left - 1 });
        console.log("runs_left: %s", this.runs_left);
        console.log('done');
    } catch (err) {
        console.log('error on script %s : %s, deactivating', this.get("id"), err);
        this.update({ active: false });
    }

    
    if (vm._context.output) {
    }
    //    console.log(vm._context.output);
    //    var output = vm._context.output.substring(0, 139);
    //    Message.build({ message: output, threadId: threadId }) .save()
    //        .then(() => { console.log('message added'); })
    //        .catch((err) => { console.log(err) });
    //}
    //

}
