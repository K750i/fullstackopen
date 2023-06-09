const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

router
  .get('/', async (request, response, next) => {
    try {
      const blogs = await Blog.find().populate('user', 'username name');
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
      if (!request.user) {
        return response
          .status(401)
          .json({ status: 'fail', message: 'Unauthorized user.' });
      }

      const blog = new Blog(request.body);
      const user = await User.findById(request.user.id);
      blog.user = user._id;

      const result = await blog.save();
      user.blogs = [...user.blogs, result._id];
      await user.save();

      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (request, response, next) => {
    try {
      const targetBlog = await Blog.findById(request.params.id);

      if (!request.user?.id || request.user.id !== targetBlog.user.toString()) {
        return response
          .status(401)
          .json({ status: 'fail', message: 'Only blog creator can perform deletion.' });
      }

      await Blog.deleteOne({ _id: request.params.id });
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', async (request, response, next) => {
    try {
      const { title, author, url, likes } = request.body;
      const blog = {
        title,
        author,
        url,
        likes,
      };

      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
      });

      response.json(updatedBlog);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
