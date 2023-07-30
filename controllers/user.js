const User = require('../models/user');
const BadRequest = require('../error/BadRequest');

// const getUser = async (req, res, next) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (err) {
//     next(err);
//   }
// };

const getUserById = async (req, res, next) => {
  try {
    const action = req.body;
    const user = await User.findById(action);
    res.status(200).send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные.'));
    } else {
      next(err);
    }
  }
};

const editInfoUser = async (req, res, next) => {
  try {
    const action = {};
    action.name = req.body.name;
    action.email = req.body.email;
    const user = await User.findByIdAndUpdate(
      req.user,
      action,
      { new: true },
    );
    res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new BadRequest('Пользователь с таким Email уже есть.'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUserById,
  editInfoUser,
};
