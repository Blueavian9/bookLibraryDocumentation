const db = require("../models");
const Book = db.books;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.author) {
    res.status(400).send({
      message: "Title and author can not be empty!",
    });
    return;
  }

  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publishedYear: req.body.publishedYear,
    });
    res.send(book);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Book.",
    });
  }
};

// Retrieve all Books from the database with pagination.
exports.findAll = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const limit = parseInt(size);
  const offset = (page - 1) * limit;

  try {
    const { count, rows: books } = await Book.findAndCountAll({
      limit,
      offset,
    });
    res.send({
      totalItems: count,
      books,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving books.",
    });
  }
};

// Find a single Book with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByPk(id);
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: `Cannot find Book with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Book with id=" + id,
    });
  }
};

// Update a Book by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  // Validate request
  if (
    !req.body.title &&
    !req.body.author &&
    !req.body.description &&
    !req.body.publishedYear
  ) {
    res.status(400).send({
      message: "At least one field must be provided for update!",
    });
    return;
  }

  try {
    const [num] = await Book.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Book was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Book with id=" + id,
    });
  }
};

// Delete a Book with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Book.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Book was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Book with id=" + id,
    });
  }
};
