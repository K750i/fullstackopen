const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router
  .get('/', async (request, response, next) => {
    try {
      const users = await User.find().populate('blogs', 'title author url');
      response.json(users);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (request, response, next) => {
    try {
      const { username, name, password } = request.body;

      if (!password) throw new Error('Password must not be empty');
      if (password.length < 3) throw new Error('Password must be at least 3 chars');

      const salt = 10;
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({ username, name, passwordHash });
      response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
