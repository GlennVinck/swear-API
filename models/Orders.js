const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  deliveryAdress: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  shoeSize: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
