import { User } from "../models/users.model.js";
import userService from "../service/user.service.js";


// Login user
const loginUser = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(201).send(token);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Register user
const registerNewUser = async (req, res) => {
  try {
    const token =  await userService.registerNewUser(req.body);
    res.status(201).send(token);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  // Gets the current user object excluding the password
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

export { loginUser, registerNewUser, getCurrentUser };
