const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listAllBooks = (req, res) => {
  
  let sql = "SELECT * FROM owned_books WHERE ?? = ?"
  let values = ["user_id", req.user_id];
  sql = mysql.format(sql, values);

  pool.query(sql, (err, rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    }
  );
};

const getBookByid = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["owned_books", "book_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const getBookByTitle = (req, res) => {
  const { title } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["owned_books", "book_title", title]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const addBook = (req, res) => {
  const { user_name, permissions, user_id } = req;
  req.body.user_id = user_id;

  console.log(req.body);
  let sql = "INSERT INTO ?? SET ?";
  let values = {
    ...req.body,
  };

  sql = mysql.format(sql, ["owned_books", values]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const removeBook = (req, res) => {
  let { id } = req.params;
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["owned_books", "ownedbook_id", id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Deleted ${results.affectedRows} owned_book(s)`,
    });
  });
};

module.exports = {
  listAllBooks,
  getBookByid,
  getBookByTitle,
  addBook,
  removeBook,
};
