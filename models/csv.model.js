import mongoose from "mongoose";

const csvSchema = new mongoose.Schema({
  Part: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  Price: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  Availability: {
    type: String,
    enum: ["in-stock", "out of stock"], // Ensures it is either "in-stock" or "out of stock"
    required: true,
    default: function () {
      return this.Quantity > 0 ? "in-stock" : "out of stock";
    },
  },
});

const Csv = mongoose.model("Csv", csvSchema);

export { Csv };
