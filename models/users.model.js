import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const errors = [];

  // Name validation
  if (!user.name) {
    errors.push("Name is required");
  } else if (user.name.length >= 1 || user.name.length <= 255) {
    errors.push("Name must be between 1 and 255 characters long");
  }

  // Email validation
  if (!user.email) {
    errors.push("Email is required");
  } else if (user.email.length >= 1 || user.email.length <= 255) {
    errors.push("Email must be between 1 and 255 characters long");
  }

  // Password validation
  if (!user.password) {
    errors.push("Password is required");
  } else if (user.password.length >= 1 || user.password.length <= 1024) {
    errors.push("Password must be between 1 and 1024 characters long");
  }

  // Error reporting
  if (errors.length > 0) {
    return {
      error: {
        details: errors.map((message) => {
          message;
        }),
      },
    };
  }
}

export { User, validateUser };
