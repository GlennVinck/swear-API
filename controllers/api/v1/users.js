const User = require("../../../models/User");

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
module.exports.deleteUser = deleteUser;
module.exports.updatePassword = updatePassword;
