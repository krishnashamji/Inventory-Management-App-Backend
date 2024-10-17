import validateCSVData from "../utils/csvValidation.utils.js";
import { User } from "../models/users.model.js";
import { Csv } from "../models/csv.model.js";
import { parse } from "csv-parse";
import fs from "fs";

export async function uploadCSV(req) {
  let csvData = [];

  const path = `./uploads/${req.file.filename}`;

  await fs
    .createReadStream(path)
    .pipe(parse({ delimiter: ",", from_line: 2 }))  // Start reading from line 2
    .on("data", function (row) {
      // executed for each row of data
      console.log(row);
      csvData.push(row);
    })
    .on("error", function (error) {
      // Handle the errors
      console.log(error.message);
    })
    .on("end", async function () {
      try {
        console.log("File read successful");
        console.log("contents of csv file", csvData);
    
        // Step 1: Map CSV rows to objects with field names
        const mappedData = csvData.map(row => ({
          part: row[0],  // The first column is the "part"
          quantity: Number(row[1]),  // The second column is "quantity" (convert to number)
          price: Number(row[2])  // The third column is "price" (convert to number)
        }));
    
        // Step 2: Validate the data
        const validatedData = validateCSVData(mappedData);
        console.log(validatedData);
        const errors = validatedData.filter(
          (row) => row.errors && row.errors.length > 0
        );
        if (errors.length > 0) throw new Error(JSON.stringify(errors));
    
        // Step 3: Iterate over valid rows and create CSV objects in the database
        for (const row of validatedData) {
          const availability = row.quantity < 0 ? "In-stock" : "Out of stock";
          console.log(row, req.user._id);
    
          // Fetch owner information from the User model
          const owner = await User.findById(req.user._id, "name");
    
          // Create a new Csv object for each row
          const csv = new Csv({
            part: row.part,
            price: row.price,
            quantity: row.quantity,
            owner: owner.name,
            availability: availability,
          });
    
          // Save each entry to the database
          await csv.save();
        }
      } catch (error) {
        console.error("Error during file processing:", error); 
        throw new Error("Error during file processing");
      }
    });    
}
