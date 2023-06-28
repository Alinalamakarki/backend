const router = require("express").Router();
const productController = require("./../controller/productController");

const authController = require('./../controller/authController')
const reviewController = require("./../controller/reviewController");
const dashboardController = require("../controller/dashboardController");

const { multer, storage } = require("./../servces/multer");
const upload = multer({ storage: storage });

router.get("/show_products", 
    productController.show_products
);

router.get("/show_one_product/:id", 
    productController.showone
);

router.use(
    authController.isLoggedIn,
    authController.checkuser
)

router.post("/create_products",
    upload.array("photo", 5),
    productController.create_product
);

router.patch("/update_product/:id",
    authController.givePermissionTo("seller"),
    productController.update_products
);

router.delete("/delete_product/:id", 
    authController.givePermissionTo("seller"),
    productController.delete_products
);


// review
router.post("/:id/review", 
    reviewController.review_upload
);

router.delete("/:id/review/delete", 
    reviewController.deleteReview
);

router.patch("/:id/review/update",
    reviewController.updateReview
);


// add to cart
router.post("/addtocart/:productId", 
    productController.addToCart
);


// add to favourite 
router.post("/favourite/:productId", 
    productController.AddToFavourites
)


// dashboard / tracker seller
router.get("/dashboard/uploads", 
    dashboardController.viewUploads
);


module.exports = router;
/// new code 
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