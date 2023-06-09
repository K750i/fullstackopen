const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    const pwdCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && pwdCorrect)) {
      return response.status(401).json({
        status: 'fail',
        message: 'Invalid username or password.',
      });
    }

    const payload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET);
    response.status(200).json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
