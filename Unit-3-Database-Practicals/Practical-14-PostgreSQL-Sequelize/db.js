const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "product_db",
  "postgres",
  "1656430274",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432
  }
);

// Check database connection
sequelize.authenticate()
  .then(() => {
    console.log("PostgreSQL database connected successfully!");
  })
  .catch((error) => {
    console.log("Unable to connect:", error);
  });

module.exports = sequelize;