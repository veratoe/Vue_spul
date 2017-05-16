var db = require("../db");

// define model
var Vote = module.exports = db.sequelize.define("vote", 
    {
        type: db.Sequelize.ENUM('up', 'down'),
    },
    {
        hooks: {
            afterCreate (instance, options) {
                

            },
        }
    });

var Script = require("./script.js");
var User = require("./user.js");

Vote.belongsTo(Script);
Vote.belongsTo(User);
