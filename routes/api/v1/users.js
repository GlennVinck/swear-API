const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");

router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.updatePassword);

module.exports = router;
