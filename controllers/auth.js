const jsonweb = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config');
const Conflict = require('../error/Conflict');
const Unauthorized = require('../error/Unauthorized');

// хэширование пароля, добавление в БД
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    res.status(201).send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new Conflict('Пользователь с таким Email адресом уже существует'));
    } else {
      next(err);
    }
  }
};

// аутентификация пользователя
// проверка мыла, проверка пароля, генерация токена и добавления его в cookie
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      throw new Unauthorized('Еmail не найден в БД');
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jsonweb.sign(
        { _id: user._id },
        config.JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    } else {
      throw new Unauthorized('Password не найден в БД');
    }
  } catch (err) {
    next(err);
  }
};

// удаление cookie при выходе пользователя из аккаунта
const logout = (req, res) => {
  res.status(200).clearCookie('jwt').send(JSON.stringify());
};

module.exports = {
  createUser,
  login,
  logout,
};
