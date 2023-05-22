import User2 from "../models/User2.js";

import User from "../models/User.js";
// import OverallStat from "../models/OverallStat.js";
// import Transaction from "../models/Transaction.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

// export const getAllUser = async (req, res) => {
//   User.find()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving Winners.",
//       });
//     });
// };

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };


export const registerUser = async (req, res) => {
  try {
    const { firstName, email, password,lastName,role, phoneNumber, username } = req.body;
    const errors = {};

    if (!firstName) {
      errors.firstName = 'Name is a required field.';
    }
    if (!lastName) {
      errors.lastName = 'Email is a required field.';
    }
    if (!password) {
      errors.password = 'Password is a required field.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const existingUser = await User2.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with that email already exists.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User2({ firstName, email,lastName,role, phoneNumber, username, password: hashedPassword });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'my_secret_key', { expiresIn: '1h' });
    newUser.token = token;
    await newUser.save();
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Define the route handler for logging in a user
export const loginUser = async (req, res) => {
  try {
    // Get the user data from the request body
    const { email, password } = req.body;

    // Validate the user data
    const errors = {};
    if (!email) {
      errors.email = 'Email is a required field.';
    }

    if (!password) {
      errors.password = 'Password is a required field.';
    }

    // Check if there are any errors in the input data
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Check if the user exists in the database
    let existingUser = await User2.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Compare the user's password with the stored hash
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'my_secret_key', { expiresIn: '1h' });

    // Save token to user document in database
    existingUser.token = token;
    await existingUser.save();

    // Respond with the token and user data
    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, password, email, phoneNumber, role } = req.body;
    const newUser = new User2({ firstName, lastName, username, password, email, phoneNumber, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User2.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  
  try {
    const { id } = req.params;
    const user = await User2.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User2 not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username, password, email, phoneNumber, role } = req.body;
    const updatedUser = await User2.findByIdAndUpdate(
      id,
      { firstName, lastName, username, password, email, phoneNumber, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User2 not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User2.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User2 not found' });
    }
    res.status(204).json({});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
