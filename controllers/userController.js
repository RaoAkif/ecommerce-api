const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Create a new user
// @route POST /users
// @access Private
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error)
  }
}

// @desc Create a new user
// @route POST /users
// @access Private
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

// @desc Update a user
// @route POST /users/1
// @access Private
const updateUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const { username, password } = req.body

    const updateUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        username: username,
        password: password,
      },
    })
    res.json(updateUser)
  } catch (error) {
    next(error);
  }
}

// @desc Delete a user
// @route POST /users/1
// @access Private
const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.json(deleteUser)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}