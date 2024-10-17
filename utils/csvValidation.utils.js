const validateCSVData = (data) => {
  const requiredFields = ["part", "price", "quantity"];

  return data.map((row) => {
    const errors = [];

    // Check for missing required fields
    requiredFields.forEach((field) => {
      if (!row[field]) {
        errors.push(`${field} is missing`);
      }
    });

    // Validate 'part'
    if (row.part && (row.part.length <= 1 || row.part.length >= 255)) {
      errors.push("Part must be between 1 and 255 characters");
    }

    // Validate 'price'
    if (!row.price) {
      errors.push("Price is required");
    }

    // If errors were found, return the row with an 'errors' object
    if (errors.length > 0) {
      return { ...row, errors };
    }

    return { ...row, errors: null };
  });
};

export default validateCSVData;
