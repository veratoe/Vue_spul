var db = require("../db");
var router = require("../router.js");

// define model
var Thread = module.exports = db.sequelize.define("thread", {
	thread: {
		type: db.Sequelize.STRING,
		field: "title"
	}
});

console.log('thread.js: de router: ', router);
//Thread.hasMany(Message);
Thread.sync();

// routes
router.get("/threads", (req, res) => {

    Thread.findAll({ include: [ Message ] })
        .then(threads => {
            res.json(threads);
        })
        .catch(e => { 
            throw e; 
        });
});

router.post("/threads", (req, res) => {

    console.log('creating thread');

    Thread.create({
        title: req.body.title
    })
    .then(thread => {
        console.log("Saved thread ", thread.get("id"));
        res.status(200).send();
    });

});
