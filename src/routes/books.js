const express = require("express");
const router = express.Router();
const booksController = require("../controllers/bookscontroller");

router.get("/",  booksController.listAllBooks);
router.get("/:id", booksController.getBookByID);


module.exports = router;
