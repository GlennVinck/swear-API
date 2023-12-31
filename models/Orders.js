const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  deliveryAdress: {
    fullAdress: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    shippingTo: {
      type: String,
      required: true,
    },
    shippingFrom: {
      type: String,
      required: true,
    },
  },
  email: {
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
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
