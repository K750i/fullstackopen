const Blog = require('../models/blog');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const api = supertest(app);
const blogs = require('./test_data').slice(-2);

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.create(blogs);
});

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the identifier of a blog is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added to the DB', async () => {
  const newBlog = {
    title: 'A new blog for testing',
    author: 'Anonymous',
    url: 'http://example.com/',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const modifiedBlog = await Blog.find();
  expect(modifiedBlog).toHaveLength(blogs.length + 1);

  const titles = modifiedBlog.map((n) => n.title);
  expect(titles).toContain('A new blog for testing');
});

test('likes default to 0 if unspecified', async () => {
  const newBlog = {
    title: 'A blog without the likes property',
    url: 'http://example.com',
  };
  const savedBlog = await Blog.create(newBlog);

  const response = await api.get(`/api/blogs/${savedBlog._id.toString()}`);
  expect(response.body).toHaveProperty('likes', 0);
});

test('backend rejects invalid blogs', async () => {
  const newBlog = {
    author: 'Anonymous',
    likes: 1,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
