const { authJwt } = require("./middleware/authJwt.js");
const books = require("../controllers/book.controller.js");
const router = require("express").Router();

// Public routes
router.get("/", books.getAllBooks);
router.get("/:id", books.getBookById);

// Protected routes
router.post("/", authJwt.verifyToken, books.createBook);
router.put("/:id", authJwt.verifyToken, books.updateBook);
router.delete("/:id", authJwt.verifyToken, books.deleteBook);

module.exports = (app) => {
  app.use("/api/books", router);
};
