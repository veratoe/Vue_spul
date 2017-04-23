var db = require('../db.js');

var Message = db.sequelize.define('message', {
	message: {
		type: db.Sequelize.STRING,
		field: 'message'
	}
});

module.exports = Message;

