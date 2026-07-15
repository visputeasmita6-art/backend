const express = require("express");
const cors = require("cors");

const sequelize = require("./app/config/DB");
const productRoutes = require("./app/routes/productRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, db: "connected" });
  } catch (err) {
    res.status(500).json({ ok: false, db: "disconnected", error: err?.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Ensure DB is reachable before starting
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");

    // If you want Sequelize to sync models automatically:
    // await sequelize.sync();
    // console.log("✅ Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server Running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();

module.exports = app;

