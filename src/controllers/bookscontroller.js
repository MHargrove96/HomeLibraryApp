const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listAllBooks = (req, res) => {
  pool.query("SELECT * FROM books", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getBookByID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["books", "book_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

module.exports = {
  listAllBooks,
  getBookByID,
};
