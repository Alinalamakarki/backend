const {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/secrets");

const createCookies = (res, userId, message) => {
  const shinedRefreshToken = jwt_signin(
    {
      id: userId,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  res
    .cookie("refreshToken", shinedRefreshToken, {
      maxAge: 2 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "None",
    })
    .status(201)
    .json(message);
};

module.exports = { createCookies };
