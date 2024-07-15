const express = require("express");
const bookController = require("../controllers/book.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", verifyToken, bookController.createBook);
router.get("/", verifyToken, bookController.getBooks);
router.get("/:id", verifyToken, bookController.getBookById);
router.put("/:id", verifyToken, bookController.updateBook);
router.delete("/:id", verifyToken, bookController.deleteBook);

module.exports = router;
