const uuid = require("uuid");
const dynamoose = require("../dynamo");
const Schema = dynamoose.Schema;

const commentSchema = new Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

// commentSchema.set('toJSON', { getters: true });
// commentSchema.options.toJSON.transform = (doc, ret) => {
//   const obj = { ...ret };
//   delete obj._id;
//   return obj;
// };

const postSchema = new Schema({
  id: {type: String, default: () => uuid.v4(), hashKey: true},
  title: { type: String, required: true },
  url: { type: String },
  author: { type: String, required: true, index: {
    name: 'authorIdx',
    global: true,
    rangeKey: 'score'
  } },
  category: { type: String, required: true, index: {
    name: 'categoryIdx',
    global: true,
    rangeKey: 'score'
  } },
  score: { type: Number, default: 0},
  votes : { type: Array, 
    schema: [{
      type: Object,
      schema: {
        "userId" : String,
        "vote" : Number
  }}]},
  //comments: [commentSchema],
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  type: { type: String, default: 'link', required: true },
  text: { type: String },
  upvotePercentage: {type: Number, default: 0}
});

// postSchema.set('toJSON', { getters: true, virtuals: true });
// postSchema.options.toJSON.transform = (doc, ret) => {
//   const obj = { ...ret };
//   delete obj._id;
//   delete obj.__v;
//   return obj;
// };

const Post = dynamoose.model('Post', postSchema);

// postSchema.virtual('upvotePercentage').get(function () {
//   if (this.votes.length === 0) return 0;
//   const upvotes = this.votes.filter(vote => vote.vote === 1);
//   return Math.floor((upvotes.length / this.votes.length) * 100);
// });


Post.methods.document.set('vote', function (userid, vote)  {
  console.log(this.votes);
  const existingVote = this.votes.find(item => item.userId == userid);

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
    this.votes.push({ userid, vote });
  }

  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  this.upvotePercentage = Math.floor((upvotes.length / this.votes.length) * 100)

  return this.save();
});

Post.methods.document.set('join', function (user, role) {
  const isJoined = this.participants.find(item => item.userId.equals(user.id));

  if (!isJoined) {
    this.participants.push(
      {
        userId: user.id,
        name: user.username,
        role: role,
        contributions: "Full Stack Developer",
      } 
    );
  }

  return this.save();
});

Post.methods.document.set('leave', function (user) {
  const isJoined = this.participants.find(item => item.userId.equals(user.id));

  if (isJoined) {
    this.participants.pull(isJoined);
  }

  return this.save();
});

Post.methods.document.set('changeType', function (type) {
  this.type = type;
  return this.save();
});

Post.methods.document.set('addComment', function (author, body) {
  this.comments.push({ author, body });
  return this.save();
});

Post.methods.document.set('removeComment', function (id) {
  const comment = this.comments.id(id);
  if (!comment) throw new Error('Comment not found');
  comment.remove();
  return this.save();
});

// postSchema.pre(/^find/, function () {
//   this.populate('author').populate('comments.author');
// });


// postSchema.pre('save', function (next) {
//   this.wasNew = this.isNew;
//   next();
// });

// Post.methods.document.set('preSave', function () {
//     this.wasNew = this.isNew;
//   });

// postSchema.post('save', function (doc, next) {
//   if (this.wasNew) this.vote(this.author._id, 1);
//   doc
//     .populate('author')
//     .populate('comments.author')
//     .execPopulate()
//     .then(() => next());
// });

// Post.methods.document.set('postSave', function (doc,next) {
//     if (this.wasNew) this.vote(this.author._id, 1);
//   doc
//     .populate('author')
//     .populate('comments.author')
//     .execPopulate()
//     .then(() => next());
// });


module.exports = Post;
