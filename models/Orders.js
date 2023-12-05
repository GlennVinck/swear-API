const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  shoeSize: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
