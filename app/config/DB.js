const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { Sequelize } = require("sequelize");

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error("❌ DB_URL environment variable is not set.");
  process.exit(1);
}

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
})();

module.exports = sequelize;