const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    // Return the token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
};
