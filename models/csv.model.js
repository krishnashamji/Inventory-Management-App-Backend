import mongoose from "mongoose";

const csvSchema = new mongoose.Schema({
  part: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  availability: {
    type: String,
    enum: ["In-stock", "Out of stock"], // Ensures it is either "in-stock" or "out of stock"
    required: true,
    default: function () {
      return this.Quantity > 0 ? "In-stock" : "Out of stock";
    },
  },
});

const Csv = mongoose.model("Csv", csvSchema);

export { Csv };