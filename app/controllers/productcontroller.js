let products = [];
let nextId = 1;

const productController = {
  getProducts(req, res) {
    res.json(products);
  },

  getProduct(req, res) {
    const product = products.find((item) => item.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  },

  createProduct(req, res) {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = {
      id: nextId++,
      name,
      price,
      category
    };

    products.push(product);
    return res.status(201).json(product);
  },

  updateProduct(req, res) {
    const product = products.find((item) => item.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, category } = req.body;
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;

    return res.json(product);
  },

  patchProduct(req, res) {
    const product = products.find((item) => item.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    return res.json(product);
  },

  deleteProduct(req, res) {
    const index = products.findIndex((item) => item.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products.splice(index, 1);
    return res.json({ message: "Product deleted successfully" });
  }
};

module.exports = productController;