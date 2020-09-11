'use strict';
const Sequelize = require('sequelize');
const db = {};

let sequelize = new Sequelize(
  process.env.RDS_DB_NAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: 'mysql'
  }
);

db.users = require('./user.model.js')(sequelize, Sequelize)
db.connections = require('./connection.model.js')(sequelize, Sequelize)
db.black_list = require('./token_blacklist.model.js')(sequelize, Sequelize)
db.covid_instances = require('./covid_instance.model.js')(sequelize, Sequelize)

console.log(db);
return
db.covid_instances.hasOne(db.users, { foreignKey: { name: 'covid_instance', allowNull: true}})
db.users.belongsToMany(db.users, { through: db.connections, as: 'Requester', foreignKey: 'requesterId', onDelete: 'CASCADE' })
db.users.belongsToMany(db.users, { through: db.connections, as: 'Accepter', foreignKey: 'accepterId', onDelete: 'CASCADE' })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
