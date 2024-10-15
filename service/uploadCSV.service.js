import validateCSVData from "../utils/csvValidation.utils.js";
import { User } from "../models/users.model.js";
import Csv from "../models/csv.model.js";

export async function uploadCSV(req) {
  // Step 1: Validate the data
  const validatedData = validateCSVData(req.body.csvData);
  const errors = validatedData.filter(
    (row) => row.errors && row.errors.length > 0
  );
  if (errors.length > 0) throw new Error({ errors });

  // Step 2: Iterate over the valid rows and create new CSV objects in the database
  for (const row of validatedData) {
    const availability = row.quantity > 0 ? "In-stock" : "Out of stock";

    // Fetch owner information from the User model
    const owner = await User.findById(req.user._id, "name");

    // Create a new Csv object for each row
    const csv = new Csv({
      part: row.parts,
      price: row.price,
      quantity: row.quantity,
      owner: owner.name,
      availability: availability,
    });

    // Save each entry to the database
    await csv.save();
  }
}
