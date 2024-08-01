const request = require("supertest");
const app = require("../app"); // Adjust path to your Express app

describe("Book Routes", () => {
  it("should retrieve all books", async () => {
    const res = await request(app).get("/books?page=1&size=10");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("totalItems");
    expect(res.body).toHaveProperty("books");
  });

  // More tests for other routes
});
