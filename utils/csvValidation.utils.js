const validateCSVData = (data) => {
  const requiredFields = ["Part", "Price", "Quantity"];

  // Use map to return a new array of objects, with possible errors attached
  return data.map((row) => {
    const errors = [];

    // Check for missing required fields
    requiredFields.forEach((field) => {
      if (!row[field]) {
        errors.push(`${field} is missing`);
      }
    });

    // Validate 'Parts'
    if (row.Part && (row.Part.length <= 1 || row.Part.length >= 255)) {
      errors.push("Parts must be between 1 and 255 characters");
    }

    // Validate 'Price'
    if (!row.Price) {
      errors.push("Price is required");
    }

    // If errors were found, return the row with an 'error' object
    if (errors.length > 0) {
      return { ...row, errors };
    }

    // Return row with no errors
    return { ...row, errors: null };
  });
};

export default validateCSVData;
