const productsRoutes = require("express").Router();
const productController = require("./../controller/productController");
const multer = require("../servces/multer");
const authController = require("./../controller/authController");

productController.post(
  "/create_products",
  authController.isLoggedIn,
  authController.checkuser,
  authController.givePermissionTo("seller"),
  productController.create_product
);

productController.get("/show_products", productController.show_products);

productController.get("/show_one_product/:id", productController.showone);

productController.patch(
  "/update_product/:id",
  authController.isLoggedIn,
  authController.checkuser,
  authController.givePermissionTo("seller"),
  productController.update_products
);

productController.delete(
  "/delete_product/:id",
  authController.isLoggedIn,
  authController.checkuser,
  authController.givePermissionTo("seller"),
  productController.delete_products
);

// review
productController.post(
  "/:id/review",
  authController.isLoggedIn,
  authController.checkuser,
  reviewController.review_upload
);

productController.delete(
  "/:id/review/delete",
  authController.isLoggedIn,
  authController.checkuser,
  reviewController.deleteReview
);

productController.patch(
  "/:id/review/update",
  authController.isLoggedIn,
  authController.checkuser,
  reviewController.updateReview
);

module.exports = productsRoutes;
