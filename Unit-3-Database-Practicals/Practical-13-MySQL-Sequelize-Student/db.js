const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "student_db",
  "root",
  "1656430274",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = sequelize;