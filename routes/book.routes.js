const express = require("express");
const router = express.Router();
const books = require("../controllers/book.controller.js");
const authJwt = require("../middleware/authJWT.js");

console.log("authJwt object:", authJwt);

// Public routes
router.get("/", books.getAllBooks);
router.get("/:id", books.getBookById);

// Protected routes
router.post("/", authJwt.verifyToken, books.createBook);
router.put("/:id", authJwt.verifyToken, books.updateBook);
router.delete("/:id", authJwt.verifyToken, books.deleteBook);

module.exports = router;

// module.exports = (app) => {
//   app.use("/api/books", router);
// };
