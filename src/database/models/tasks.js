const Sequelize = require("sequelize");
const connection = require("../connection");
const userModel = require("./users");

const taskModel = connection.define("tasks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  tarefa: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

taskModel.belongsTo(userModel);
userModel.hasMany(taskModel);

taskModel.sync({ force: false });
module.exports = taskModel;
