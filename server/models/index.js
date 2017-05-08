var User = require("./user.js");
var Message = require("./message.js");

module.exports = {
    User,
    Message,
    Thread: require("./thread.js"),
    Script: require("./script.js"),
    Mutation: require("./mutation.js"),
};


User.sync();
Message.sync();
