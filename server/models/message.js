var db = require("../db");
var router = require("../router.js");

// define model
var Message = module.exports = db.sequelize.define("message", {
	message: {
		type: db.Sequelize.STRING,
		field: "message"
	}
});

var Thread = require("./thread.js");

console.log('message.js: de router: ', router);
console.log("t:", Thread);
//Message.belongsTo(Thread);
Message.sync();

// REST routes
router.get("/threads/:id/messages", (req, res) => {

    console.log('requested messages on thread ', req.params.id);

    Message.findAll({ where: { thread_id: req.params.id }})
        .then((messages) => {
            res.json(messages);
        }, (error) => { console.log("AN ERROR", error); });
});

router.post("/threads/:id/messages", (req, res) => {

    console.log('creating message on thread ', req.params.id);

    Thread.findById(req.params.id).addMessage({
        message: req.body.message
    })
    .then(message => {
        console.log("Saved message ", message.get("id"));
        res.status(200).send();
    });

});
