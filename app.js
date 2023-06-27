const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const { PORT } = require("./config/secrets");
const ERROR = require("./utils/customErrorMessage");
const port = PORT || 8000;

// Routers
const routes = require("./router/routes");
const errorHandler = require("./middleware/errorHandler");

// carrying frontend data to backend
app.use(express.json({ urlencoded: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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