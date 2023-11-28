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
});
const Order = mongoose.model("Order", orderSchema);

const getAllOrders = (req, res) => {
  res.json({
    status: "success",
    message: "All orders retrieved",
    data: {
      shoes: [],
    },
  });
};

const getSingleOrder = (req, res) => {
  let id = req.params.id;
  res.json({
    status: "success",
    message: `Order with id ${id} retrieved`,
    data: {
      shoes: [],
    },
  });
};

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      customerName: req.body.customerName,
      shoeSize: req.body.shoeSize,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
      quantity: req.body.quantity,
      orderDate: req.body.orderDate,
    });

    const savedOrder = await order.save();

    res.json({
      status: "success",
      message: "New order created",
      data: {
        order: savedOrder,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};

const deleteOrder = (req, res) => {
  res.json({
    status: "success",
    message: `Order with id ${req.params.id} deleted`,
  });
};

const updateOrder = (req, res) => {
  res.json({
    status: "success",
    message: `Order with id ${req.params.id} updated`,
  });
};

module.exports.getAllOrders = getAllOrders;
module.exports.createOrder = createOrder;
module.exports.getSingleOrder = getSingleOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;
module.exports.Order = Order;
