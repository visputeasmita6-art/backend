const path = require("path");
const fs = require("fs");

// Load local .env only when it exists (safe for Render where env vars are provided)
const localEnvPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(localEnvPath)) {
  require("dotenv").config({ path: localEnvPath });
}


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