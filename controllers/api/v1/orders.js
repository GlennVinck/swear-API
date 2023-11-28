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

const createOrder = (req, res) => {
  res.json({
    status: "success",
    message: "New order created",
    data: {
      shoes: [],
    },
  });
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
