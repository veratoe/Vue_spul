var User = require("./user.js");
var Message = require("./message.js");
var Thread = require("./thread.js");

module.exports = {
    User,
    Message,
    Thread,
    Script: require("./script.js"),
    Mutation: require("./mutation.js"),
};

User.sync();
Message.sync();
Thread.sync();
