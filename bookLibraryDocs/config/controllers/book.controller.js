const { Book } = require("../models");

exports.createBook = async (req, res) => {
  try {
    const { title, description, published, url } = req.body;
    const book = await Book.create({
      id: title,
      title,
      description,
      published,
      url,
    });
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating book" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, description, published, url } = req.body;
    const [updated] = await Book.update(
      { title, description, published, url },
      {
        where: { id: req.params.id },
      }
    );
    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }
    const book = await Book.findByPk(req.params.id);
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting book" });
  }
};
