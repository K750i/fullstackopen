const listHelper = require('../utils/list_helpers');
const blogs = require('./test_data');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.slice(0, 1));
    expect(result).toBe(7);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test('within a list is returned', () => {
    const expectedValue = blogs[2];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(expectedValue);
  });
});

describe('author with the most blog', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test('within a list is returned', () => {
    const expectedValue = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(expectedValue);
  });
});

describe('author with the most liked blogs', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test('within a list is returned', () => {
    const expectedValue = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(expectedValue);
  });
});
