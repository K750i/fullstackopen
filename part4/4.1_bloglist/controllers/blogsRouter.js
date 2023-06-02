const router = require('express').Router();
const Blog = require('../models/blog');

router
  .get('/', async (request, response, next) => {
    try {
      const blogs = await Blog.find();
      response.json(blogs);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id);
      response.json(blog);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (request, response, next) => {
    try {
      const blog = new Blog(request.body);

      const result = await blog.save();
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
