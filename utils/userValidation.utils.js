// Validate login
function validateLogin(req) {
  const errors = [];

  // Email validation
  if (!req.email) {
    errors.push({ message: "Email is required" });
  } else if (req.email.length <= 1 || req.email.length >= 255) {
    errors.push({ message: "Email must be 1 and 255 characters long" });
  }

  // Password validation
  if (!req.password) {
    errors.push({ message: "Password is required" });
  } else if (req.password.length <= 6 || req.password.length >= 255) {
    errors.push({ message: "Password must be 6 and 255 characters long" });
  }

  // Error reporting
  if (errors.length > 0) {
    return {
      error: {
        details: errors,
      },
    };
  }

  // Return if no errors are found
  return { error: null };
}

// Validate user
function validateUser(req) {
  const errors = [];

  // Name validation
  if (!req.name) {
    errors.push({ message: "Name is required" });
  } else if (req.name.length < 1 || req.name.length > 255) {
    errors.push({ message: "Name must be between 1 and 255 characters long" });
  }

  // Email validation
  if (!req.email) {
    errors.push({ message: "Email is required" });
  } else if (req.email.length < 1 || req.email.length > 255) {
    errors.push({ message: "Email must be between 1 and 255 characters long" });
  }

  // Password validation
  if (!req.password) {
    errors.push({ message: "Password is required" });
  } else if (req.password.length < 1 || req.password.length > 1024) {
    errors.push({
      message: "Password must be between 1 and 1024 characters long",
    });
  }

  // Error reporting
  if (errors.length > 0) {
    return {
      error: {
        details: errors,
      },
    };
  }

  // Return if no errors are found
  return { error: null };
}

export { validateLogin, validateUser };
