const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization?.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
};

const userExtractor = (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      request.user = decodedToken;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
