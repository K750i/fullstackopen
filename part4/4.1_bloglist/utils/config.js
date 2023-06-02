require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_TESTURI = process.env.MONGODB_TESTURI;

module.exports = {
  MONGODB_URI,
  MONGODB_TESTURI,
  PORT,
};
