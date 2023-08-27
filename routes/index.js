const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const {
  createUser,
  login,
  logout,
} = require('../controllers/auth');
const {
  validCreateUser,
  validLogin,
} = require('../middlewares/validation');
const NotFound = require('../error/NotFound');

router.post('/signup', validCreateUser, createUser);
router.post('/signin', validLogin, login);
router.use(auth);
router.post('/signout', logout);
router.use('/user', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Такая страница не существует'));
});

module.exports = router;
