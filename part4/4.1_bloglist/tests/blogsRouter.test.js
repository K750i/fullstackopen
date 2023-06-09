const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const blogs = require('./test_data').slice(-2);

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.create(blogs);
});

describe('Querying the DB', () => {
  test('returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns a blog with id as the identifier', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('returns blogs with likes default to 0 if unspecified', async () => {
    const newBlog = {
      title: 'A blog without the likes property',
      url: 'http://example.com',
    };
    const savedBlog = await Blog.create(newBlog);

    const response = await api.get(`/api/blogs/${savedBlog._id.toString()}`);
    expect(response.body).toHaveProperty('likes', 0);
  });
});

describe('Posting to the DB', () => {
  test('fails with a 401 if token is not provided', async () => {
    const newBlog = {
      title: 'A new blog for testing',
      author: 'Anonymous',
      url: 'http://example.com/',
      likes: 1,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });

  test('succeeds if the blog is valid', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'johndoe', password: 'sekret' });

    const newBlog = {
      title: 'A new blog for testing',
      author: 'Anonymous',
      url: 'http://example.com/',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const modifiedBlog = await Blog.find();
    expect(modifiedBlog).toHaveLength(blogs.length + 1);

    const titles = modifiedBlog.map((n) => n.title);
    expect(titles).toContain('A new blog for testing');
  });

  test('fails if the blog is invalid', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'johndoe', password: 'sekret' });

    const newBlog = {
      author: 'Anonymous',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(400);
  });

  test('with PUT succeeds with a valid ID', async () => {
    const blogs = await Blog.find();
    const blogToBeUpdated = blogs[0];
    blogToBeUpdated.likes = 88;

    await api
      .put(`/api/blogs/${blogToBeUpdated._id.toString()}`)
      .send(blogToBeUpdated.toJSON());

    const updatedBlog = await Blog.findById(blogToBeUpdated.id);
    expect(updatedBlog).toHaveProperty('likes', 88);
  });
});

describe('Deleting from the DB', () => {
  test("fails if the user isn't authenticated or is not a creator", async () => {
    const blogsAtStart = await Blog.find();
    const blogToBeDeleted = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(401);

    const blogsAtEnd = await Blog.find();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test('succeeds with a 204 if done by an authenticated creator', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'johndoe', password: 'sekret' });

    const newBlog = {
      title: 'To be deleted',
      author: 'John Doe',
      url: 'http://example.com/',
      likes: 1,
    };

    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${response.body.token}`);

    const blogsAtStart = await Blog.find();
    const blogToBeDeleted = blog.body;

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(204);

    const blogsAtEnd = await Blog.find();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToBeDeleted.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
