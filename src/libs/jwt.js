const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "6h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

module.exports = createAccessToken;
