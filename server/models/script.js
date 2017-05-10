var db = require("../db.js");

// define model;
var Script = module.exports = db.sequelize.define("script", 
    {
        script: db.Sequelize.STRING(1024),
        name: db.Sequelize.STRING(1024),
        active: db.Sequelize.BOOLEAN,
        runs_left: db.Sequelize.INTEGER,
        error_message: db.Sequelize.STRING(1024),
        last_run_time: db.Sequelize.FLOAT
    }, 
    {
        hooks: {
            afterUpdate (instance, options, fn) {
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

// routes

router.get("/threads/:id/scripts/", (req, res) => {

    Script.findAll({ where: { threadId : req.params.id }})
        .then(scripts => {
            res.status(200).json(scripts);
        });
});

router.put("/threads/:thread_id/scripts/:id", (req, res) => {

    var values = {};
    var allowedValues = ["active", "script", "name"];

    // filter toegestane attributen
    allowedValues.forEach(p => { 
        if (typeof req.body[p] !== "undefined") {
            values[p] = req.body[p];
        }
    });

    Script
        .findById(req.params.id)
        .then(script => {
            if (!script) {
                res.status(400).send();
                return;
            }
            
            script
                .update(values)
                .then(s => {
                    res.status(200).json(s);
                });
        })
        .catch(() => { console.error("script %s not found", req.params.id); });

});

router.post("/threads/:id/scripts", (req, res) => {

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {
                res.status(400).send();
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

    var error;
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
    var start = process.hrtime();
    var elapsed;

    try {
        vm.run(this.get("script"));
        elapsed = process.hrtime(start)[1] / 1000000;
        console.log('done');

    } catch (e) {
        error = e;
        console.log('error on script %s : %s, deactivating', this.get("id"), e);
        this
            .update({ active: false, error_message: e.toString() });
    }
    
    if (!error) {

        if (vm._context.output) {
            var output = vm._context.output.substring(0, 139);
            Message
                .build({ message: output, threadId: threadId, owner: 'script', scriptId: this.get("id") }) 
                .save()
                .then(() => { console.log('message added'); })
                .catch((err) => { console.log(err); });

            this.update({ 
                runs_left: this.runs_left - 1, 
                error_message: "",
                last_run_time: elapsed
            });

            console.log("run_time", elapsed);
            console.log("runs_left: %s", this.runs_left);
            console.log(vm._context.output);
        }
        if (vm._context.star) {
            message.update({ star: true });
        }

    }

};
