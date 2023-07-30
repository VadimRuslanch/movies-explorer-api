const jsonweb = require('jsonwebtoken');
const config = require('../config');
const Unauthorized = require('../error/Unauthorized');

// Проверка токена
const auth = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;
    let payload;
    if (!jwt) {
      throw new Unauthorized('Вы не авторизовались');
    } else {
      payload = jsonweb.verify(jwt, config.JWT_SECRET);
      req.user = payload;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
