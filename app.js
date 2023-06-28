const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const process = require("node:process");
const { PORT } = require("./config/secrets");
const ERROR = require("./utils/customErrorMessage");
const port = PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// need to update

// page gateway
// app.use("/api/v1/user", cors(corsOptions), userRouter);
// app.use("/api/v1/products", cors(corsOptions), productRouter);
// app.use("/api/v1/admin", cors(corsOptions), adminRouter);  // -> super admin pannel
// app.use("/vehicles", cors(corsOptions), vehicleRouter);






// Routers
const routes = require("./router/routes");
const errorHandler = require("./middleware/errorHandler");

// carrying frontend data to backend
app.use(cors());
app.use(cookieParser());

// page gateway
app.use("/api/v2", routes);

app.use(errorHandler);

// gateway not available response
app.use("*", (req, res, next) => {
  next(ERROR(404, `Sorry, cant find ${req.path} gateway!!`));
});

// server
app.listen(port, () => {
  console.log(
    `server is running at port: ${port}  /n URL: http://localhost:${port}`
  );
});
process.on('unhandledRejection', (err) => {
  console.log("unhandeled promise rejection");
  server.close(() => {
      process.exit(1);
  })
})
