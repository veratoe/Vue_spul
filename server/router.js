var express = require("express");
var router = express.Router();
var Message = require("./models/message");

router.use((req, res, next) => {
    console.log("Incoming request, time: ", Date.now());
    next();
});


module.exports = router;

