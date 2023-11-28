const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/v1/orders");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getSingleOrder);
router.post("/", orderController.createOrder);
router.delete("/:id", orderController.deleteOrder);
router.put("/:id", orderController.updateOrder);

module.exports = router;
