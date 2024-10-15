import { USER_EMAIL_PASSWORD_INVALID, USER_ALREADY_EXISTS } from "../errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLogin, validateUser } from "../utils/userValidation.utils.js";
import config from "../config";
import { User } from "../models/users.model.js";


export async function loginUser(req) {
  // Validates incoming request body
  const { error } = validateLogin(req);
  if (error) throw new Error(error.details[0].message);

  // Checks if user doesn't exist
  let user = await User.findOne({ email: req.email });
  if (!user) throw new Error(USER_EMAIL_PASSWORD_INVALID);

  // Decrypt and compare password
  const validatePassword = await bcrypt.compare(
    req.password,
    user.password
  );
  if (!validatePassword) {
    throw new Error(USER_EMAIL_PASSWORD_INVALID);
  }
  // Generate jwt token
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  // If login is valid send token
  return token;
}

export async function registerNewUser(req) {
  // Validates incoming request body
  const { error } = validateUser(req);
  if (error) throw new Error(error.details[0].message);

  // Checks if the user already exists
  let user = await User.findOne({ email: req.email });
  if (user) throw new Error(USER_ALREADY_EXISTS);

  // Create new user object if user doesn't exist
  user = new User({
    name: req.name,
    email: req.email,
    password: await bcrypt.hash(req.password, 12), // Hash password to ensure sensitive information is stored securely
  });

  // Save to database
  await user.save();

  // Generate jwt token
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  return token;
}
