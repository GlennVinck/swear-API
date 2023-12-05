const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);

const bcrypt = require("bcrypt");
const saltRounds = 12;

const createUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      status: "success",
      message: "User created",
      data: {
        user: newUser,
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

module.exports.createUser = createUser;
