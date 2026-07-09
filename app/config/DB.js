require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : null;

if (sequelize) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.error("Connection Error:", err);
    });
} else {
  console.warn("DB_URL not set. Starting without a database connection.");
}

module.exports = sequelize;