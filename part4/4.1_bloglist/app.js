const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogsRouter');

mongoose.connect(config.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to the database.');
});

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
