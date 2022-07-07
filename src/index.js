const express = require("express");
const app = express();
const cors = require("cors")
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const ownedBooksRouter = require("./routes/ownedBooks");
const bookWishListRouter = require("./routes/bookWishList");
const port = process.env.PORT || 4001;

require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/mybooks", ownedBooksRouter);
app.use("/mywishlist", bookWishListRouter);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the server, This is will soon be a book cataloging app!"
  );
});

app.listen(port, () => {
  console.log(`Web server listening on Port ${port}!`);
});
