const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogsRouter');
const usersRouter = require('./controllers/usersRouter');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const URI = process.env.NODE_ENV === 'test' ? config.MONGODB_TESTURI : config.MONGODB_URI;

mongoose.connect(URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to the database.');
});

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ status: 'fail', message: err.message });
  }

  if (err.name === 'MongoServerError') {
    return res.status(500).json({ status: 'fail', message: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ status: 'fail', message: err.message });
  }

  if (err.name === 'Error') {
    return res.status(500).json({ status: 'fail', message: err.message });
  }

  console.log(err.name);
  next(err);
});

module.exports = app;
