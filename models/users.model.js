import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(1).max(1024).required(),
  });
  return schema.validate(user);  
}



export { User, validateUser}


