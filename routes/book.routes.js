const { authJwt } = require("../middleware");

module.exports = (app) => {
  const books = require("../controllers/book.controller.js");
  const router = require("express").Router();

  // Public routes
  router.get("/", books.getAllBooks);
  router.get("/:id", books.getBookById);

  // Protected routes
  router.post("/", [authJwt.verifyToken], books.createBook);
  router.put("/:id", [authJwt.verifyToken], books.updateBook);
  router.delete("/:id", [authJwt.verifyToken], books.deleteBook);

  // Create a new book
  router.post("/", books.createBook);

  // Retrieve all books
  router.get("/", books.getAllBooks);

  // Retrieve a single book with id
  router.get("/:id", books.getBookById);

  // Update a book with id
  router.put("/:id", books.updateBook);

  // Delete a book with id
  router.delete("/:id", books.deleteBook);

  app.use("/api/books", router);
};
