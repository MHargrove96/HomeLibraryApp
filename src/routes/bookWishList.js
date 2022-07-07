const express = require("express");
const router = express.Router();
const bookWishListController = require("../controllers/bookWishListController");
const { checkJWT } = require("../controllers/authController");

router.get("/",  bookWishListController.listAllBooks);
router.get("/:title", bookWishListController.getBookByName);
router.post("/", checkJWT, bookWishListController.addToWishList)
router.delete("/:id", bookWishListController.removeBook)


module.exports = router;
