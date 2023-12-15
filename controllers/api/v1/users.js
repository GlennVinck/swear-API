const User = require("../../../models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 12;

const createUser = async (req, res) => {
  //{
  //   "firstName": "Glenn",
  //   "lastName": "Vinck",
  //   "email": "vinck_glenn@hotmail.com",
  //   "password": "1234"
  //}

  let { firstName, lastName, email, password } = req.body;

  console.log(req.body);

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

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please provide both an email and password",
      data: null,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Password is incorrect",
        data: null,
      });
    }

    if (!user.admin) {
      return res.status(403).json({
        status: "error",
        message: "Access forbidden. User is not an admin.",
        data: null,
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      admin: user.admin,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({
      status: "success",
      message: "User logged in",
      data: {
        token,
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

const logoutUser = (req, res) => {
  try {
    res.json({
      status: "success",
      message: "User logged out",
      data: null,
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

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      message: "User deleted",
      data: {
        user: deletedUser,
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

const updatePassword = async (req, res) => {
  let userId = req.params.id;
  let { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedPassword = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${userId} not found`,
      });
    }

    res.json({
      status: "success",
      message: `Password from user with id ${userId} updated`,
      data: {
        user: updatedPassword.password,
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
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.deleteUser = deleteUser;
module.exports.updatePassword = updatePassword;
