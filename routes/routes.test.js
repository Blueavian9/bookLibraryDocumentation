const request = require("supertest");
const app = require("../app"); // Adjust path as needed
const { sequelize, Book } = require("../models"); // Adjust path as needed
const mockAuthMiddleware = require("./mockAuthMiddleware");

// Mock the authJwt middleware
jest.mock("../middleware/authJWT", () => mockAuthMiddleware);

describe("Book Routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /books", () => {
    it("should return all books", async () => {
      await Book.bulkCreate([
        { title: "Book 1", author: "Author 1" },
        { title: "Book 2", author: "Author 2" },
      ]);

      const response = await request(app).get("/books");

      expect(response.status).toBe(200);
      expect(response.body.books.length).toBe(2);
      expect(response.body.books[0]).toHaveProperty("title", "Book 1");
      expect(response.body.books[1]).toHaveProperty("title", "Book 2");
    });
  });

  describe("POST /books", () => {
    it("should create a new book", async () => {
      const newBook = { title: "New Book", author: "New Author" };

      const response = await request(app).post("/books").send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("title", "New Book");
      expect(response.body).toHaveProperty("author", "New Author");
    });
  });

  // Add more test cases for other routes (GET /:id, PUT /:id, DELETE /:id)
});
