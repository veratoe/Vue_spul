var User = require("./user.js");
var Message = require("./message.js");
var Thread = require("./thread.js");
var Script = require("./script.js");
var Vote = require("./vote.js");

module.exports = {
    User,
    Message,
    Thread,
    Script,
    Vote,
    Mutation: require("./mutation.js"),
};

// sequelize z'n magie doen

User.sync();
Message.sync();
Thread.sync();
Script.sync();
Vote.sync();
