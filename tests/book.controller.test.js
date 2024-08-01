const bookController = require("../controllers/book.controller");
const db = require("../models");

// Mock the db.books methods
jest.mock("../models", () => ({
  books: {
    findAndCountAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe("Book Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    it("should fetch all books with pagination", async () => {
      const mockBooks = [
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
      ];
      db.books.findAndCountAll.mockResolvedValue({
        count: mockBooks.length,
        rows: mockBooks,
      });

      const mockReq = { query: {} };
      const mockRes = {
        send: jest.fn(),
      };

      await bookController.getAllBooks(mockReq, mockRes);

      expect(db.books.findAndCountAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
      expect(mockRes.send).toHaveBeenCalledWith({
        totalItems: mockBooks.length,
        books: mockBooks,
        currentPage: 1,
        totalPages: 1,
      });
    });

    it("should handle errors", async () => {
      const errorMessage = "Database error";
      db.books.findAndCountAll.mockRejectedValue(new Error(errorMessage));

      const mockReq = { query: {} };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await bookController.getAllBooks(mockReq, mockRes);

      expect(db.books.findAndCountAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  // Additional tests for createBook, findOne, update, delete methods...
});
