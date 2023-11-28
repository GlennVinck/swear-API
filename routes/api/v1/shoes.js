const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({
    status: "success",
    data: {
      shoes: [],
    },
  });
});

module.exports = router;
