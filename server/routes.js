var express = require("express");
var router = express.Router();
var Message = require("./models/message");

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router.get("/messages", (req, res) => {

    Message.all()
        .then((messages) => {
            res.json(messages);
        }, (error) => { console.log("AN ERROR", error); });
});

router.post("/messages", (req, res) => {

    Message.create({ message: req.body.message })
        .then((message) => {
            console.log("Saved: ", message);
            res.status(200).send();
        });

});

module.exports = router;

