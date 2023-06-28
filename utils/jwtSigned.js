const jwt = require("jsonwebtoken");

const jwt_signed = (id, secretKey, jwtExpireIn) => {
  return JsonWebTokenError.sign(
    id,
    secretKey,
    {
      expiresIn: jwtExpireIn,
    }
  );
};
