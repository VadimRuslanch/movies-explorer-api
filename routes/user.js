const userRouter = require('express').Router();
const {
  // getUser,
  getUserById,
  editInfoUser,
} = require('../controllers/user');
const { validUserById, validEditInfoUser } = require('../middlewares/validation');

// userRouter.get('/', getUser);
userRouter.get('/me', validUserById, getUserById);
userRouter.patch('/me', validEditInfoUser, editInfoUser);

module.exports = userRouter;
