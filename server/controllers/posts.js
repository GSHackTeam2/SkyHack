const { body, validationResult } = require('express-validator/check');
const Post = require('../models/post');
const User = require('../models/user');

exports.load = async (req, res, next, id) => {
  try {
    req.post = await Post.query("id").eq(id).exec();
    if (!req.post) return res.status(404).json({ message: 'post not found' });
  } catch (err) {
    if (err.name === 'CastError')
      return res.status(400).json({ message: 'invalid post id' });
    return next(err);
  }
  next();
};

exports.show = async (req, res) => {
  const post = (await req.post.populate())[0];
  const newPost = await Post.update({'id':post.id, 'views':post.views+1 });
  res.json(newPost);
};

exports.list = async (req, res) => {
  const resp = await Post.scan().exec();
  const posts = await resp.populate();
  posts.sort(Post.compare);
  res.json(posts);
};

exports.listByCategory = async (req, res) => {
  const category = req.params.category;
  const posts = await Post.query('category').eq(category).using('categoryIdx').sort('ascending').exec();
  res.json(posts);
};

exports.listByUser = async (req, res) => {
  const username = req.params.user;
  const author = (await User.scan().where("username").eq(username).exec())[0];
  // const posts = await Post.scan().where("author").eq(author.username).exec();
  const posts = await Post.query('author').eq(author.id).using('authorIdx').sort('descending').exec();
  res.json(posts);
};

Post.methods.set('compare', function(post1, post2) {
  return post1.score > post2.score;
});

exports.create = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { title, url, category, type, text } = req.body;
    const author = req.user.username;
    const votes = [];
    const post = await Post.create({
      title,
      url,
      author,
      category,
      type,
      text,
      votes
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const titleIsValid = body('title')
  .exists()
  .withMessage('is required')

  .isLength({ min: 1 })
  .withMessage('cannot be blank')

  .isLength({ max: 100 })
  .withMessage('must be at most 100 characters long')

  .custom(value => value.trim() === value)
  .withMessage('cannot start or end with whitespace');

const urlOrTextIsValid = (req, res, next) => {
  if (req.body.type === 'link') {
    const chain = body('url')
      .exists()
      .withMessage('is required')

      .isURL()
      .withMessage('is invalid');

    chain(req, res, next);
  } else {
    const chain = body('text')
      .exists()
      .withMessage('is required')

      .isLength({ min: 4 })
      .withMessage('must be at least 4 characters long');

    chain(req, res, next);
  }
};

const typeIsValid = body('type')
  .exists()
  .withMessage('is required')

  .isIn(['link', 'text'])
  .withMessage('must be a link or text post');

const categoryIsValid = body('category')
  .exists()
  .withMessage('is required')

  .isLength({ min: 1 })
  .withMessage('cannot be blank');

exports.validate = [
  titleIsValid,
  urlOrTextIsValid,
  categoryIsValid,
  typeIsValid
];

exports.upvote = async (req, res) => {
  console.log(req.post);
  const post = await req.post[0].vote(req.user.id, 1);
  res.json(post);
};

exports.downvote = async (req, res) => {
  const post = await req.post[0].vote(req.user.id, -1);
  res.json(post);
};

exports.unvote = async (req, res) => {
  const post = await req.post[0].vote(req.user.id, 0);
  res.json(post);
};

exports.destroy = async (req, res) => {
  await req.post.remove();
  res.json({ message: 'success' });
};
