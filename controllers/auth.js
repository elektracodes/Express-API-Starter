const config = require("../config/app");
const jwt = require("jsonwebtoken");
const { db_read } = require("../config/db");
const Hash = require("crypto-js/pbkdf2");
const _ = require("lodash");
/**
 * Returns jwt token id email and password are correct
 */
function login(req, res) {
  db_read.query(
    "SELECT id, email, password FROM users where email = ?",
    [req.body.email],
    (err, response, fields) => {
      if (!err && response.length === 1) {
        const user = response[0];

        const passwordInput = Hash(
          req.body.password,
          config.appSecret
        ).toString();

        if (user.password !== passwordInput) {
          res
            .status(401)
            .send({ error: "Unauthorized", message: "Authentication failed" });
        } else {
          const sign = {
            exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
            sub: user.id // Identifies the subject of the JWT.
          };

          res.json({
            message: "success",
            data: jwt.sign(sign, config.jwtSecret)
          });
        }
      } else {
        res
          .status(401)
          .send({ error: "Unauthorized", message: "Authentication failed" });
      }
    }
  );
}

/**
 * Returns user data
 */

function me(req, res) {
  const { password = "", ...rest } = req.user;
  res.json({
    message: "success",
    data: rest
  });
}

module.exports = { login, me };
