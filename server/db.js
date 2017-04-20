var s = require('sequelize');
var p = new s('wub', 'chronos', '', {
	host: 'localhost',
	dialect: 'postgres'
});

module.exports = {

	Sequelize: s,
	sequelize: p,
	
};
