var User = require("./user.js");
var Message = require("./message.js");
var Thread = require("./thread.js");
var Script = require("./script.js");

module.exports = {
    User,
    Message,
    Thread,
    Script,
    Mutation: require("./mutation.js"),
};

// sequelize z'n magie doen

User.sync();
Message.sync();
Thread.sync();
Script.sync();
