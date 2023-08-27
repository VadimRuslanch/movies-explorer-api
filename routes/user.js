const userRouter = require('express').Router();
const {
  getUserById,
  editInfoUser,
} = require('../controllers/user');
const { validEditInfoUser } = require('../middlewares/validation');

userRouter.get('/me', getUserById);
userRouter.patch('/me', validEditInfoUser, editInfoUser);

module.exports = userRouter;
