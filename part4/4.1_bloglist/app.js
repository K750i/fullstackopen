const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogsRouter');
const URI =
  process.env.NODE_ENV === 'test' ? config.MONGODB_TESTURI : config.MONGODB_URI;

mongoose.connect(URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to the database.');
});

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ status: 'fail', message: 'Invalid request object' });
  }
  next(err);
});

module.exports = app;
