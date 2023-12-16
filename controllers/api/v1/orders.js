const Order = require("../../../models/Orders");

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();

    res.json({
      status: "success",
      message: "All orders retrieved",
      data: {
        orders: allOrders,
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

const getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: `Order with id ${orderId} not found`,
        data: null,
      });
    }

    res.json({
      status: "success",
      message: `Order with id ${orderId} retrieved`,
      data: {
        order: order,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: "error",
      message: `Order with id ${orderId} not found`,
      data: null,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      customerName: req.body.customerName,
      deliveryAdress: req.body.deliveryAdress,
      email: req.body.email,
      image: req.body.image,
      orderDate: req.body.orderDate,
      orderNumber: req.body.orderNumber,
      price: req.body.price,
      quantity: req.body.quantity,
      shoeSize: req.body.shoeSize,
      status: req.body.status,
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

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        status: "error",
        message: `Order with id ${orderId} not found`,
      });
    }

    res.json({
      status: "success",
      message: `Order with id ${orderId} deleted`,
      data: {
        order: deletedOrder,
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

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        status: "error",
        message: `Order with id ${orderId} not found`,
      });
    }

    res.json({
      status: "success",
      message: `Order with id ${orderId} updated`,
      data: {
        order: updatedOrder,
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

module.exports.getAllOrders = getAllOrders;
module.exports.createOrder = createOrder;
module.exports.getSingleOrder = getSingleOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;
module.exports.Order = Order;
