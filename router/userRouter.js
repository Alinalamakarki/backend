
const usersRoutes = require("express").Router();
const userController = require("../controller/authController");

usersRoutes.post("/signup", userController.signup);
usersRoutes.post("/login", userController.login);
usersRoutes.post("/forgetPassword", userController.forgetPassword);
usersRoutes.post("/resetPassword/:token", userController.resetPassword);
usersRoutes.patch("/update_password/:id", userController.updatePassword);

module.exports = usersRoutes;
