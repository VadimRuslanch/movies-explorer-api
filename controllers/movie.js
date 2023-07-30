const Muvie = require('../models/movie');
const NotFound = require('../error/NotFound');
const Forbidden = require('../error/Forbidden');
const BadRequest = require('../error/BadRequest');

// Получение данных о фильмах с БД
const getMuvies = async (req, res, next) => {
  try {
    const movies = await Muvie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const getMuviesBuId = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userMuvies = await Muvie.find({ owner: userId });
    res.status(200).send(userMuvies);
  } catch (err) {
    next(err);
  }
};

// Создание карточек фильмов
const createCardMuvie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const cardMuvie = await Muvie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    res.status(201).send(cardMuvie);
  } catch (err) {
    next(err);
  }
};

// Удаление карточки фильма с БД
const deliteCardMuvie = async (req, res, next) => {
  try {
    const muvieId = req.body;
    const cardMuvie = await Muvie.findById(muvieId);
    if (!cardMuvie) {
      throw new NotFound('Карточка с указанным _id не найдена.');
    } else if (muvieId.owner.toString() !== req.user._id) {
      throw new Forbidden('Нельзя удалить чужую карточку.');
    } else {
      await cardMuvie.deleteOne();
      res.send(cardMuvie);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные.'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMuvies,
  getMuviesBuId,
  createCardMuvie,
  deliteCardMuvie,
};
