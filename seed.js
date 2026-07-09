require("dotenv").config();
const sequelize = require("./app/config/DB");
const Product = require("./app/models/products");

const seed = async () => {
  if (!sequelize) {
    console.error("No DB connection available. Set DB_URL in .env");
    process.exit(1);
  }

  try {
    await sequelize.sync();
    await Product.bulkCreate([
      { name: "Laptop", price: 70000, category: "electronics" },
      { name: "Phone", price: 30000, category: "electronics" },
      { name: "Headphones", price: 1500, category: "accessories" }
    ]);
    console.log("Seed data created");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
