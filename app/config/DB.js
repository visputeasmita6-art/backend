const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { Sequelize } = require("sequelize");

const dbUrl = process.env.DB_URL;

const sequelize = dbUrl
  ? new Sequelize(dbUrl, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    })
  : null;

if (sequelize) {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("Database Connected Successfully");
    } catch (err) {
      console.error("Connection Error:", err);
    }
  })();
} else {
  console.warn("DB_URL not set. Starting without a database connection.");
}


module.exports = sequelize;