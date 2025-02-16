const { Sequelize } = require("sequelize");

const connection = new Sequelize("db_list_task", "root", "Zxc@123zxc123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
