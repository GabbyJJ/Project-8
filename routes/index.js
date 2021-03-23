var express = require("express");
const { request, response, render } = require("../app");
var router = express.Router();
var { Book } = require("../models");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/books");
});
router.get("/books", function (req, res, next) {
  Book.findAll()
    .then((books) => {
      res.render("books", { books });
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});
router.get("/books/new", function (req, res, next) {
  res.render("new-book");
});
router.post("/books/new", function (req, res, next) {
  Book.create({
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
    year: request.body.year,
  })
    .then((book) => {
      console.log(book);
      res.redirect("/book");
    })
    .catch((error) => {
      console.log(error);
      res.render("new-book", { error: error.errors });
    });
});
router.get("/books/:id", function (req, res, next) {
  Book.findAll({ where: { id: req.params.id } })
    .then((book) => {
      res.render("update-book", { book: book[0] });
    })
    .catch((error) => {
      res.render("page-not-found");
    });
});

router.post("/books/:id", function (req, res, next) {
  Book.findByPK(req.params.id)
    .then((book) => {
      book
        .update({
          title: request.body.title,
          author: request.body.author,
          genre: request.body.genre,
          year: request.body.year,
        })
        .then((book) => {
          res.redirect("/books");
        })
        .catch((error) => {
          res.render("update-book", { error: error.errors });
        });
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});

router.post("/books/:id/delete", function (req, res, next) {
  Book.findByPK(req.params.id)
    .then((book) => {
      book
        .destroy()
        .then(() => {
          res.redirect("/books");
        })
        .catch((error) => {
          console.log(error);
          next();
        });
    })
    .catch((error) => {
      console.log(error);
      next();
    });
});
module.exports = router;
