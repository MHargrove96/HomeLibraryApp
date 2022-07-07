const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
const argon2 = require("argon2");

const listAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserByID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["users", "user_id", id]);
  //remove hashed password from the results

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const createUser = async (req, res) => {
  let { user_name, first_name, last_name, email, user_password } =
    req.body;
  let hash = await argon2.hash(user_password, { hashLength: 50 });
  
  let sql =
    "INSERT INTO users(user_name, first_name, last_name, email, user_password) VALUES (?, ?, ?, ?, ? )";
  sql = mysql.format(sql, [user_name, first_name, last_name, email, hash]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId, results: results });
  });
};

const editUser = (req, res) => {
  const { id } = req.params;
  console.log(req.user_id, "user_id", id, "params_id");
  if (req.user_id !== Number(id)) {
    return res.status(401).json("please log in as user");
  }
  const { user_name, first_name, last_name, email } = req.body;
  let sql = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
  sql = mysql.format(sql, [
    "users",
    "user_name",
    user_name,
    "first_name",
    first_name,
    "last_name",
    last_name,
    "email",
    email,
    "user_id",
    id,
  ]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: "User information updated", ...req.body });
  });
};

const removeUser = (req, res) => {
  const { id } = req.params;
  console.log(req.user_id, "user_id", id, "params_id");
  if (req.user_id !== Number(id)) {
    return res.status(401).json("please log in as user");
  }
  let sql = "DELETE FROM users WHERE ?? = ?";
  sql = mysql.format(sql, ["user_id", id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `User has been removed.`, ...req.body });
  });
};

module.exports = {
  listAllUsers,
  getUserByID,
  createUser,
  editUser,
  removeUser,
};
