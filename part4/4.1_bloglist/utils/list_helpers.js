const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((favBlog, nextblog) => {
        if (favBlog.likes < nextblog.likes) {
          favBlog = nextblog;
        }
        return favBlog;
      });
};

const mostBlogs = (blogs) => {
  const aggregate = () => {
    const result = new Map();

    blogs.forEach((blog) => {
      const name = blog.author;

      if (result.has(name)) {
        result.set(name, result.get(name) + 1);
      } else {
        result.set(name, 1);
      }
    });

    return result;
  };

  const findMostBlogsAuthor = (authors) => {
    return [...authors.entries()].reduce((cur, next) => {
      const [curAuthor] = cur;
      const [nextAuthor] = next;
      return authors.get(curAuthor) > authors.get(nextAuthor) ? cur : next;
    });
  };

  const authors = aggregate();

  if (authors.size === 0) return null;

  const author = findMostBlogsAuthor(authors);

  return {
    author: author[0],
    blogs: author[1],
  };
};

const mostLikes = (blogs) => {
  const aggregate = () => {
    const result = new Map();

    blogs.forEach((blog) => {
      const name = blog.author;

      if (result.has(name)) {
        result.set(name, result.get(name) + blog.likes);
      } else {
        result.set(name, blog.likes);
      }
    });

    return result;
  };

  const findMostLikedAuthor = (authors) => {
    return [...authors.entries()].reduce((cur, next) => {
      const [curAuthor] = cur;
      const [nextAuthor] = next;
      return authors.get(curAuthor) > authors.get(nextAuthor) ? cur : next;
    });
  };

  const authors = aggregate();

  if (authors.size === 0) return null;

  const author = findMostLikedAuthor(authors);

  return {
    author: author[0],
    likes: author[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
