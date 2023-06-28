const database = require("./../model/index");
const jwt = require("jsonwebtoken");


const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const { sendRespondWithStatus } = require("../utils/sendRespondWithStatus");
const { comparePasswords, generateHash } = require("../utils/passwordBcrypt");
const ERROR = require("../utils/customErrorMessage");
const { createCookies } = require("../utils/createCookies");
// deconstruction
const user = database.users;

// SIGNUP
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const firstNameString = String(firstName).trim();
  const lastNameString = String(lastName).trim();
  const emailString = String(email).trim();
  const passwordString = String(password);

  if (!firstNameString && !lastNameString && !emailString && !passwordString)
    return next(ERROR(400, "all feild is required"));

  try {
    const emailFound = await user.findOne({
      where: {
        email: email,
      },
    });

    if (emailFound) return next(ERROR(409, "email is already registered!!!")); // if the email is already register then respond send this respond

    const hashedPassword = generateHash(passwordString);
    await user.create({
      firstName: firstNameString,
      lastName: lastNameString,
      email: emailString,
      password: hashedPassword,
      role: "user",
      refreshToken: false,
    });
    sendRespondWithStatus(
      res,
      201,
      `Dear, ${firstNameString}! Account registered successfully. Enjoy our services.`
    );
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  const emailString = String(email).trim();
  const passwordString = String(password);

  if (!emailString) return next(ERROR(400, "enter you email!!"));

  if (!passwordString) return next(ERROR(400, "enter your password!!"));

  if (typeof rememberMe !== "boolean")
    return next(ERROR(400, "rememberMe can be either true or false only"));
  try {
    const registeredEmail = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (registeredEmail === null)
      return next(ERROR(401, "wrong credentials!!"));

    const isPasswordMatch = comparePasswords(password, userSignin.password);
    if (!isPasswordMatch) {
      return next(ERROR(401, "wrong credentials!!"));
    }
    if (rememberMe) {
      createCookies(
        res,
        userSignin?.id,
        `Welcome back ${registeredEmail.firstName}`
      );
    } else {
      res.status(200).json(`Welcome back Dear ${registeredEmail.firstName}`);
    }
  } catch (err) {
    next(err);
  }
};

// FORGET PASSWORD
exports.forgetPassword = async (req, res, next) => {
  const findingUser = await user.findOne({
    email: req.body.email,
  });

  if (!findingUser) {
    statusFunc(res, 404, "can't find user! please check your email once");
  }
  let id = findingUser.id;

  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.FORGET_PASSWORD_EXPIRES_AT,
    }
  );
  statusFunc(res, 200, token);
};

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  try {
    // error handeling
    console.log(req.params.token);
    const forgetPSWuserId = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    ).id;
    const resetUser = await user.findOne({
      id: forgetPSWuserId,
    });
    resetUser.password = await bcrypt.hash(req.body.password, 12);
    resetUser.save();
    statusFunc(res, 200, "password updated successfully");
  } catch (err) {
    statusFunc(res, 200, `error: ${err.message}`);
  }
};

// update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const passportUpdateUser = await user.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!(await bcrypt.compare(req.body.password, passportUpdateUser.password))) {
    return statusFunc(res, 200, "password doesnot matched");
  }
  passportUpdateUser.password = await bcrypt.hash(req.body.passwordChange, 12);
  passportUpdateUser.save();
  statusFunc(res, 200, "password chagned successfully");
});

// check user is logged in or not
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (!req.body.cookie) {
    return statusFunc(res, 404, "please login");
  }
  const jwtDecode = jwt.verify(req.body.cookie, process.env.JWT_SECRET);
  if (jwtDecode.iat > jwtDecode.exp) {
    return statusFunc(res, 200, "expired cookie");
  }
  const findUser = await user.findOne({
    where: {
      id: jwtDecode.id,
    },
    attributes: {
      exclude: ["password", "refreshToken"],
    },
  });
  console.log(findUser);
  res.locals.userData = findUser;
  next();
});

exports.checkuser = catchAsync(async (req, res, next) => {
  // console.log(res.locals.userData)
  // statusFunc(res, 200, "found");
  next();
});

exports.givePermissionTo = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    console.log(res.locals.userData.role);
    if (!roles.includes(res.locals.userData.role)) {
      return statusFunc(
        res,
        200,
        "you doesnot have permission to perform this action"
      );
    }
    return next();
  };
};
