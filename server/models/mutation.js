var db = require("../db.js");
var router = require("../router.js");

// define model;
var Mutation = module.exports = db.sequelize.define("mutation", {
    type: db.Sequelize.STRING(1024),
    values: db.Sequelize.JSON,
    previousValues: db.Sequelize.JSON,
    changed: db.Sequelize.JSON
}); 

Mutation.sync();

// routes
router.get("/mutations/:id", (req, res) => {

    Mutation
        .findAll({ where: { id : { $gt: req.params.id }}})
        .then(mutations => {
            res.status(200).json(mutations);
        });
});
