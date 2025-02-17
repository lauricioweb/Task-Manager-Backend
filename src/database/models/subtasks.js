const Sequelize = require("sequelize");
const connection = require("../connection");
const taskModel = require("./tasks");

const subTaskModel = connection.define("subTasks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  subtarefa: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

subTaskModel.belongsTo(taskModel);
taskModel.hasMany(subTaskModel);

subTaskModel.sync({ force: false });
module.exports = subTaskModel;
