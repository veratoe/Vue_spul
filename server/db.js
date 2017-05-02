var Sequelize = require('sequelize');
var sequelize = new Sequelize('wub', 'chronos', '', {
	host: 'localhost',
	dialect: 'postgres',

    pool: {
        min: 0,
        max: 5,
        idle: 10
    },
    logging: false
});

sequelize
    .authenticate()
    .then((errors) => { console.log('Postgres connection succesful'); })
    .catch((errors) => { console.log('Errors on DB connection: ', errors); });

module.exports = {

    Sequelize: Sequelize,
	sequelize: sequelize
	
};
