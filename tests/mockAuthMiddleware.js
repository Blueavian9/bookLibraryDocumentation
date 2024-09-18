const mockAuthMiddleware = (req, res, next) => {
  req.userId = "testuser"; // or any mock user id
  next();
};

module.exports = { verifyToken: mockAuthMiddleware };
