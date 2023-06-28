const routes = require("express").Router();
const usersRoutes = require("./userRouter");
const productsRoutes = require("./productsRouter");

routes.use("/user", usersRoutes);
routes.use("/products", productsRoutes);

module.exports = routes;
