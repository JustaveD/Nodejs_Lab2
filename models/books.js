const fs = require('fs');
const path = require("path")

const formidable = require('formidable');

const rootDir = require("../utils/path");
const { createVerify } = require('crypto');


const p = path.join(rootDir, "data", "books.json");


const getBooksFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {

        if (!err) {
            books = JSON.parse(fileContent);
            cb(books);
        } else {
            cb([]);
        }
    })
}

module.exports = class Book {
    constructor(title, author, price, description, pathFile, fileName) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.description = description;
        this.pathFile = pathFile;
        this.fileName = fileName;
    }

    save(cb) {
        // save image
        let destPath = path.join(rootDir, "public", "images", this.fileName);

        fs.copyFile(this.pathFile, destPath, (err) => {
            if (err) throw err;
            fs.unlink(this.pathFile, () => {
                console.log("Temp image file was deleted!");
            })
            // save content into file data
            getBooksFromFile((books) => {
                let newId = books[books.length - 1].id + 1;
                books.push({
                    id: newId,
                    title: this.title,
                    author: this.author,
                    price: this.price,
                    description: this.description,
                    image: this.fileName
                })
                fs.writeFile(p, JSON.stringify(books), (err) => {
                    if (err) throw err;
                    cb();
                });
            })

        })

    }

    static fetchAll(cb) {
        getBooksFromFile(books => {
            cb(books);
        })
    }
    static fetchById(id, cb) {
        getBooksFromFile(books => {
            let book = books.find(b => {
                return b.id == id;
            });
            cb(book);
        })
    }

}