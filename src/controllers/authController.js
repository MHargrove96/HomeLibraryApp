const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const login = async (req, res) => {
  const { user_name, user_password } = req.body;

  if (user_name.length === 0 || user_password.length === 0) {
    return res.send("Please fill in UserName & Password");
  }

  if (user_name && user_password) {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    sql = mysql.format(sql, ["users", "user_name", user_name]);
    console.log(sql, "sql in the login function!!");

    pool.query(sql, async (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results[0]) {
        return res.send("UserName or Password incorrect");
      }
      let match;
      try {
        let hash = results[0].user_password;
        match = await argon2.verify(hash, user_password);
      } catch (error) {
        console.log(error, "error is here");
      }
      console.log(match, "match");
      if (match) {
        const accessToken = jwt.sign(
          {
            user_name: results[0].user_name,
            permissions: results[0].permissions,
            user_id: results[0].user_id,
          },
          process.env.TOKEN_SECRET
        );
        return res.json(accessToken);
      } else {
        return res.send("UserName or Password incorrect");
      }
    });
  }
};

const checkJWT = (req, res, next) => {
  console.log("checkJWT function");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.send("error with token: " + err);
      }
      req.user_name = decoded.user_name;
      req.permissions = decoded.permissions;
      req.user_id = decoded.user_id;
      next();
    });
  } else {
    return res.status(401).json("no token detected");
  }
};

module.exports = { login, checkJWT };
