const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');

exports.createAuthToken = user => {
  return jwt.sign({ user }, config.jwt.secret, {
    expiresIn: config.jwt.expiry
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    const token = this.createAuthToken(user);
    res.json({ token });
  })(req, res);
};

exports.jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'unauthorized' });
    req.user = user;
    next();
  })(req, res);
};

exports.postAuth = (req, res, next) => {
  const username = req.post.author;
  if (username == req.user.username || req.user.admin) return next();
  res.status(401).end();
};

exports.commentAuth = (req, res, next) => {
  if (
    req.comment.author.equals(req.user.username) ||
    req.post.author.equals(req.user.username) ||
    req.user.admin
  )
    return next();
  res.status(401).end();
};

exports.contributionAuth = (req, res, next) => {
  if (
    req.post.participants.find(item => item.userId == req.user.id) ||
    req.post.author == req.user.id ||
    req.user.admin
  )
    return next();
  res.status(401).end();
};

