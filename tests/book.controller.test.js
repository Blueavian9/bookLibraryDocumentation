const bookController = require("../controllers/book.controller");
const Book = require("../models/book.model");

// Mock the Book model
jest.mock("../models/book.model");

describe("Book Controller", () => {
  // Test getAllBooks
  describe("getAllBooks", () => {
    it("should fetch all books", async () => {
      const mockBooks = [
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
      ];
      Book.findAll.mockResolvedValue(mockBooks);

      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await bookController.getAllBooks(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockBooks);
    });

    it("should handle errors", async () => {
      const errorMessage = "Database error";
      Book.findAll.mockRejectedValue(new Error(errorMessage));

      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await bookController.getAllBooks(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });
  });

  // You can add more tests for other controller methods here
});
