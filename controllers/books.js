const path = require("path");

const formidable = require('formidable');

const rootDir = require("../utils/path");
const Book = require("../models/books");


module.exports.getAddBookPage = (req, res, next) => {
    res.render("add-book", {
        pageTitle: "Admin | Add book"
    })
};
module.exports.saveBookAndRedirectToList = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let pathFile = files.image.filepath;
        let fileName = files.image.originalFilename;
        let title = fields.title;
        let author = fields.author;
        let price = fields.price;
        let description = fields.description;

        const book = new Book(title, author, price, description, pathFile, fileName);
        book.save(() => {
            res.redirect("/shop/list");
        });
    })

}

module.exports.loadListOfBooks = (req, res, next) => {

    Book.fetchAll((books) => {
        res.render("book-list", {
            pageTitle: "Shop | Book list",
            books: books
        })
    })

}

module.exports.bookDetail = (req, res, next) => {
    let id = req.params.id;
    Book.fetchById(id, (book) => {
        res.render("book-detail", {
            pageTitle: "Shop | Book detail", book: book
        });
    })
}