import validateCSVData from "../utils/csvValidation.utils.js";
import { User } from "../models/users.model.js";
import Csv from "../models/csv.model.js"; 

const uploadCSVController = async (req, res) => {
  const csvData = req.body.csvData;

  // Step 1: Validate the data
  const validatedData = validateCSVData(csvData);
  const errors = validatedData.filter(row => row.errors && row.errors.length > 0);
  if (errors.length > 0) return res.status(400).send({ errors });

  // Step 2: Iterate over the valid rows and create new CSV objects in the database
  for (const row of validatedData) {
    const availability = row.Quantity > 0 ? "In-stock" : "Out of stock";

    // Fetch owner information from the User model
    const owner = await User.findById(req.user._id, 'name');

    // Create a new Csv object for each row
    const csv = new Csv({
      Part: row.Parts,
      Price: row.Price,
      Quantity: row.Quantity,
      Owner: owner.name,
      Availability: availability
    });

    // Save each entry to the database
    await csv.save();
  }

  return res.status(200).send({ message: "CSV data uploaded successfully" });
};

export default uploadCSVController;
