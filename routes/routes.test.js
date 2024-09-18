const request = require('supertest');
const app = require('../app'); // Adjust the path as needed
const db = require('../models'); // Adjust the path as needed

describe('Book Routes', () => {
  beforeAll(async () => {
    // Connect to the test database
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the database connection
    await db.sequelize.close();
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      // Create some test books
      await db.Book.bulkCreate([
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
      ]);

      const response = await request(app).get('/books');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('title', 'Book 1');
      expect(response.body[1]).toHaveProperty('title', 'Book 2');
    });
  });

  describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBook = { title: 'New Book', author: 'New Author' };

      const response = await request(app)
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'New Book');
      expect(response.body).toHaveProperty('author', 'New Author');
    });
  });

  // Add more test cases for other routes (GET /:id, PUT /:id, DELETE /:id)
});