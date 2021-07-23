const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const resp = await User.query('username').eq(username).using('usernameIdx').exec();
    if (resp.count == 0) return done(null, false, { message: 'user not found' });

    const users = await resp.populate(); // populate response into an array of documents
    const valid = await users[0].isValidPassword(password);
    if (!valid) return done(null, false, { message: 'invalid password' });

    console.log("Logging in to user: ", users[0].toJSON().username);
    return done(null, users[0].toJSON());
  } catch (err) {
    done(err);
  }
});

module.exports = localStrategy;
