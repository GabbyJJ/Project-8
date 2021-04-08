var express = require("express");
var router = express.Router();
var { Book } = require("../models");

// This will call the home page.
router.get("/", function (req, res, next) {
  res.redirect("/books");
});

router.get("/books", function async(req, res, next) {
  Book.findAll()
    .then((books) => {
      res.render("books", { books: books });
    })
    .catch((error) => {
      console.log("Error", error), next();
    });
});
router.get("/books/new", function (req, res, next) {
  res.render("new-book");
});
router.post("/books/new", function (req, res, next) {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  })
    .then((book) => {
      res.redirect("/books");
    })
    .catch((error) => {
      console.log(error);
      res.render("new-book", { errors: error.errors });
    });
});
//This router is to request the book by id. If the page cannot be found the user will get redirected to a page not found.
router.get("/books/:id", function (req, res, next) {
  //Book.findAll({ where: { id: req.params.id } })
  Book.findByPk(req.params.id)
    .then(function (book) {
      console.log(book);
      if (book) {
        res.render("update-book", { book: book, title: book.title });
      } else {
        res.render("page-not-found");
      }
    })
    .catch((error) => {
      next();
    });
});
// This router allows you to update the book and then catch the errors.
router.post("/books/:id", function (req, res, next) {
  Book.findByPk(req.params.id)
    .then(function (book) {
      book
        .update({
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          year: req.body.year,
        })
        .then((book) => {
          res.redirect("/books");
        })
        .catch((error) => {
          res.render("update-book", { book: book, errors: error.errors });
        });
    })
    .catch((error) => {
      console.log("PK ERR: ", error);
      next();
    });
});
// This router allows you to delete the book and also has a way to catch the errors.
router.post("/books/:id/delete", function (req, res, next) {
  Book.findByPk(req.params.id)
    .then((book) => {
      return book.destroy();
    })
    .then(() => {
      res.redirect("/books");
    })
    .catch((error) => {
      next();
    });
});
module.exports = router;
