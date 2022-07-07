const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { checkJWT } = require("../controllers/authController");

router.get("/",  usersController.listAllUsers);
router.get("/:id", usersController.getUserByID);
router.post("/usersignup", usersController.createUser);
router.put("/:id", checkJWT, usersController.editUser);
//change password needs to be a seperate route. https://www.npmjs.com/package/nodemailer use to send email to verify user. 
router.delete("/:id", checkJWT, usersController.removeUser);

module.exports = router;
