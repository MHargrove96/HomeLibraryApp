const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listAllBooks = (req, res) => {
  pool.query("SELECT * FROM book_wish_list", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getBookByName = (req, res) => {
  const { title } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["book_wish_list", "book_title", title]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const addToWishList = (req, res) => {
  const { user_name, permissions, user_id } = req;
  req.body.user_id = user_id;
  let sql = "INSERT INTO ?? SET ?";
  let values = {
    ...req.body,
  };

  sql = mysql.format(sql, ["book_wish_list", values]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const removeBook = (req, res) => {
  let { id } = req.params;
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["book_wish_list", "wishlist_id", id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Deleted ${results.affectedRows} owned_book(s)`,
    });
  });
};

module.exports = {
  listAllBooks,
  getBookByName,
  addToWishList,
  removeBook,
};
