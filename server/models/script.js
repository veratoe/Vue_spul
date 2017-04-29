var db = require("../db.js");

// define model;
var Script = module.exports = db.sequelize.define("script", {
    script: db.Sequelize.STRING(1024),
    active: db.Sequelize.BOOLEAN
}); 

var Thread = require("./thread.js");

Thread.hasMany(Script);

Script.sync();
