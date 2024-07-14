const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    // Get the user data from the request body
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      id: email, // Use the email as the unique identifier
      name,
      email,
      password: hashedPassword,
    });

    // Return the created user
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};
