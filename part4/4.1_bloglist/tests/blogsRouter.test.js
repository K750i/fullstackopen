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

test('deletion of a blog with valid id succeeds with a 204', async () => {
  const blogsAtStart = await Blog.find();
  const blogToBeDeleted = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

  const blogsAtEnd = await Blog.find();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).not.toContain(blogToBeDeleted.title);
});

test('updating a blog with valid id will succeed', async () => {
  const blogs = await Blog.find();
  const blogToBeUpdated = blogs[0];
  blogToBeUpdated.likes = 88;

  await api
    .put(`/api/blogs/${blogToBeUpdated._id.toString()}`)
    .send(blogToBeUpdated.toJSON());

  const updatedBlog = await Blog.findById(blogToBeUpdated.id);
  expect(updatedBlog).toHaveProperty('likes', 88);
});

afterAll(async () => {
  await mongoose.connection.close();
});
