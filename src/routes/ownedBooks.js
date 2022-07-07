const express = require("express");
const router = express.Router();
const ownedBooksController = require("../controllers/ownedBooksController");
const { checkJWT } = require("../controllers/authController");

router.get("/", ownedBooksController.listAllBooks);
router.get("/:id", ownedBooksController.getBookByid);
router.get("/:title", ownedBooksController.getBookByTitle);
router.post("/", checkJWT, ownedBooksController.addBook);
router.delete("/:id", checkJWT, ownedBooksController.removeBook);

module.exports = router;
