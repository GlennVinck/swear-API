const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({
    status: "success",
    message: "All orders retrieved",
    data: {
      shoes: [],
    },
  });
});

router.get("/:id", function (req, res) {
  let id = req.params.id;
  res.json({
    status: "success",
    message: `Order with id ${id} retrieved`,
    data: {
      shoes: [],
    },
  });
});

router.post("/", function (req, res) {
  res.json({
    status: "success",
    message: "New oder created",
    data: {
      shoes: [],
    },
  });
});

router.delete("/:id", function (req, res) {
  res.json({
    status: "success",
    message: `Order with id ${req.params.id} deleted`,
  });
});

router.put("/:id", function (req, res) {
  res.json({
    status: "success",
    message: `Order with id ${req.params.id} updated`,
  });
});

module.exports = router;
