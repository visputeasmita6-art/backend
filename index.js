// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// // initialize DB connection (Sequelize)
// const sequelize = require("./app/config/DB");

// const productRoutes = require("./app/routes/productroutes");



// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/products", productRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Backend is running" });
// });

// const PORT = process.env.PORT || 5000;

// // sync models and stand art server
// const start = async () => {
//   try {
//     if (sequelize) {
//       await sequelize.sync();
//       console.log("Database synchronized");
//     } else {
//       console.warn("No database connection available; starting without DB");
//     }

//     app.listen(PORT, () => {
//       console.log(`Server Running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// };

// start();

// module.exports = app;


const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error("❌ DB_URL environment variable is not set.");
  process.exit(1);
}

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  protocol: "postgres",
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
  } catch (error) {
    console.error("❌ Database Connection Error:");
    console.error(error);
    process.exit(1);
  }
})();

module.exports = sequelize;