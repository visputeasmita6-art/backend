const Product = require("../models/products");

const productController = {
  async getProducts(req, res) {
    try {
      const items = await Product.findAll();
      console.log("📥 getProducts count:", items?.length);
      return res.json(items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  },

  async getProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  },

  async createProduct(req, res) {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const created = await Product.create({ name, price, category });
      return res.status(201).json(created);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create product" });
    }
  },

  async updateProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const { name, price, category } = req.body;
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      if (category !== undefined) product.category = category;
      await product.save();
      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update product" });
    }
  },

  async patchProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      Object.assign(product, req.body);
      await product.save();
      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to patch product" });
    }
  },

  async deleteProduct(req, res){
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      await product.destroy();
      return res.json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  }
};

module.exports = productController;