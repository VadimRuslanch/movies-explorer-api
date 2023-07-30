const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
} = process.env;

const config = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'very-secret-key',
  MONGODB: NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/localDB',
  PORT: NODE_ENV === 'production' ? PORT : 4000,
};

module.exports = config;
