const express = require("express")

const booksControllers = require("../controllers/books");

const router = express.Router();

router.get("/list", booksControllers.loadListOfBooks)

router.get("/:id", booksControllers.bookDetail)

module.exports = router;