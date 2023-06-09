const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const api = supertest(app);
const users = [
  {
    _id: '5a422b891b54a676234d17fa',
    username: 'johndoe',
    name: 'John Doe',
    passwordHash:
      '$2b$10$2hFqIVzsW9l.MZ4PPoeR8OpeuVFbyCkugmQd7NrN2dpyGl1f9I/ha',
    __v: 0,
  },
  {
    _id: '60bf4b5e59f8f11774306a83',
    username: 'bob',
    name: 'Bobby',
    passwordHash:
      '$2y$10$6cEnQUw7/itHwbiO61/X/.eVu.InI504Uqi.nmSYR2PBZAEmEgqca',
    __v: 0,
  },
];

beforeEach(async () => {
  await User.deleteMany();
  await User.create(users);
});

test('users returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('a valid user can be added to the DB', async () => {
  const newUser = {
    username: 'jeanne',
    name: 'Jeanne of Arc',
    password: 'victory',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const startingUsers = await User.find();
  expect(startingUsers).toHaveLength(users.length + 1);

  const usernames = startingUsers.map((n) => n.username);
  expect(usernames).toContain(newUser.username);
});

test('reject duplicate username', async () => {
  const newUser = {
    username: 'bob',
    name: 'Another Bobby',
    password: 'nopass',
  };

  await api.post('/api/users').send(newUser).expect(500);

  const startingUsers = await User.find();
  expect(startingUsers).toHaveLength(users.length);
});

test('reject adding users with empty username and password', async () => {
  const newUser = {
    name: 'just a name is provided',
  };

  await api.post('/api/users').send(newUser).expect(500);

  const startingUsers = await User.find();
  expect(startingUsers).toHaveLength(users.length);
});

test('reject adding users if username is less than 3 characters', async () => {
  const newUser = {
    username: 'an',
    name: 'Anonymous',
    password: 'nopass',
  };

  await api.post('/api/users').send(newUser).expect(400);

  const startingUsers = await User.find();
  expect(startingUsers).toHaveLength(users.length);
});

test('reject adding users if password is less than 3 characters', async () => {
  const newUser = {
    username: 'anon',
    name: 'Anonymous',
    password: 'pp',
  };

  await api.post('/api/users').send(newUser).expect(500);

  const startingUsers = await User.find();
  expect(startingUsers).toHaveLength(users.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
