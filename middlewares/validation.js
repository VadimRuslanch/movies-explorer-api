const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequest = require('../error/BadRequest'); // 400

// валидания ссылок
const validationUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Передан некорретный url.');
};

// const validationID = (id) => {
//   if (/^[0-9a-fA-F]{24}$/.test(id)) {
//     return id;
//   }
//   throw new BadRequest('Передан некорретный id.');
// };

module.exports.validCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validEditInfoUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

module.exports.validCreateCard = celebrate({
  body: Joi.object().keys({
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    trailerLink: Joi.string().required().custom(validationUrl),
    image: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    created_at: Joi.string(),
    updated_at: Joi.string(),
  }),
});

module.exports.validCardById = celebrate({
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
});
