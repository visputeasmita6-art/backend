const express = require("express");

const router = express.Router();

const productController = require("../controllers/productcontroller");


router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.patch("/:id", productController.patchProduct);

router.delete("/:id", productController.deleteProduct);


module.exports = router;