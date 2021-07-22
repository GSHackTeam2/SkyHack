const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contributionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  contributions: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now }
});

contributionSchema.set('toJSON', { getters: true });
contributionSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  return obj;
};


const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

commentSchema.set('toJSON', { getters: true });
commentSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  return obj;
};

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [{ user: Schema.Types.ObjectId, vote: Number, _id: false }],
  participants: [contributionSchema],
  comments: [commentSchema],
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  type: { type: String, default: 'idea', required: true },
  text: { type: String },
});

postSchema.set('toJSON', { getters: true, virtuals: true });
postSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

postSchema.virtual('upvotePercentage').get(function () {
  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  return Math.floor((upvotes.length / this.votes.length) * 100);
});

postSchema.methods.vote = function (user, vote) {
  const existingVote = this.votes.find(item => item.user._id.equals(user));

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote === 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

postSchema.methods.join = function (user, role) {
  const isJoined = this.participants.find(item => item.userId.equals(user.id));

  if (!isJoined) {
    this.participants.push(
      {
        userId: user.id,
        name: user.username,
        role: role,
        contributions: "No contributions yet",
      } 
    );
  }

  return this.save();
};

postSchema.methods.leave = function (user) {
  const isJoined = this.participants.find(item => item.userId.equals(user.id));

  if (isJoined) {
    this.participants.pull(isJoined);
  }

  return this.save();
};

postSchema.methods.changeType = function (type) {
  this.type = type;
  return this.save();
}

postSchema.methods.changeContribution = function (user, role, contributionString) {
  const contributionObject = this.participants.find(item => item.userId.equals(user.id));
  if (contributionObject) {
    contributionObject.role = role;
    contributionObject.contributions = contributionString;
  }
  return this.save();
};

postSchema.methods.addComment = function (author, body) {
  this.comments.push({ author, body });
  return this.save();
};

postSchema.methods.removeComment = function (id) {
  const comment = this.comments.id(id);
  if (!comment) throw new Error('Comment not found');
  comment.remove();
  return this.save();
};

postSchema.pre(/^find/, function () {
  this.populate('author').populate('comments.author');
});

postSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

postSchema.post('save', function (doc, next) {
  if (this.wasNew) this.vote(this.author._id, 1);
  doc
    .populate('author')
    .populate('comments.author')
    .execPopulate()
    .then(() => next());
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
