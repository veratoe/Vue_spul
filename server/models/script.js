var db = require("../db.js");

// define model;
var Script = module.exports = db.sequelize.define("script", 
    {
        script: db.Sequelize.STRING(1024),
        name: db.Sequelize.STRING(1024),
        active: db.Sequelize.BOOLEAN,
        runs_left: db.Sequelize.INTEGER,
        error_message: db.Sequelize.STRING(1024),
        last_run_time: db.Sequelize.FLOAT,
    }, 
    {
        hooks: {
            afterCreate (instance, options) {
                Script
                    .findById(instance.dataValues.id) 
                    .then(s => {
                        Mutation.create({
                            type: "CREATE_SCRIPT",
                            values: s.dataValues                                         
                        });
                    });
            },
            afterUpdate (instance) {

                Mutation.create({ 
                    type: "UPDATE_SCRIPT",
                    values: instance.dataValues,
                    previousValues: instance._previousValues,
                    changed: instance.changed()
                });
            },
        }
    }
); 

var Thread = require("./thread.js");
var Message = require("./message.js");
var Mutation = require("./mutation.js");
var Vote = require("./vote.js");
var router = require("../router.js");

Script.hasMany(Vote);
Thread.hasMany(Script);

// routes

router.get("/threads/:id/scripts/", (req, res) => {

    Script
        .findAll({ 
            where: { threadId : req.params.id },
            attributes: ['id', [db.sequelize.literal(
                '(select count(*) from votes where "scriptId" = "scripts"."id" AND type = \'up\')'), 'upvotes']] 
        })
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

router.get("/threads/:thread_id/scripts/:script_id/upvote", (req, res) => {

    if (!req.authenticated) {
        res.status(400).end();
        return;
    }

    Vote
        .findOrCreate({ where: { scriptId: req.params.script_id, userId: req.user.id  }, defaults: { type: 'up' }})
        .spread((v, created) => {
            if (created) {
                res.status(200).json(v);
                return;
            }

            v.update({ type: 'up' })
                .then(_v => {
                        res.status(200).json(_v);
                    });
        });
    
});

router.get("/threads/:thread_id/scripts/:script_id/downvote", (req, res) => {

    if (!req.authenticated) {
        res.status(400).end();
        return;
    }

    Vote
        .findOrCreate({ where: { scriptId: req.params.script_id, userId: req.user.id  }, defaults: { type: 'down' }})
        .spread((v, created) => {
            if (created) {
                res.status(200).json(v);
                return;
            }

            v.update({ type: 'down' })
                .then(_v => {
                        res.status(200).json(_v);
                    });
        });
    
});

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

    var start = process.hrtime();
    var elapsed;

    try {
        vm.run(this.get("script"));
        elapsed = process.hrtime(start)[1] / 1000000;

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
                .then(() => { })
                .catch((err) => {});

            this.update({ 
                runs_left: this.runs_left - 1, 
                error_message: "",
                last_run_time: elapsed
            });

        }
        if (vm._context.star) {
            message.addStar();
        }

        if (vm._context.dead) {
            Thread.findById(threadId).then(t => { t.kill(); });
        }

    }

};
