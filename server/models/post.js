const { array } = require("joi");
const uuid = require("uuid");
const dynamoose = require("../dynamo");
const Schema = dynamoose.Schema;

const commentSchema = {
  type: Object,
  schema: {
    author: { type: String/*, required: true */},
    body: { type: String/*, required: true */},
    created: { type: Date, default: Date.now }  
  }
};

const contributionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  contributions: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now }
});

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
  votes : { 
    type: Array, 
    schema: [{
      type: Object,
      schema: {
        "userId" : String,
        "vote" : Number
  }}]},
  participants: [contributionSchema],
  comments: {
    type: Array,
    schema: [commentSchema]
  },
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  type: { type: String, default: 'idea', required: true },
  text: { type: String },
  upvotePercentage: {type: Number, default: 0}
});

const Post = dynamoose.model('Post', postSchema);



// Special methods for Post table
Post.methods.set('compare', function(post1, post2) {
  return post1.score > post2.score;
});

Post.methods.document.set('vote', function (userId, vote)  {
  const existingVote = this.votes.find(item => item.userId == userId);

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote === 0) {
      // remove vote
      const idx = this.votes.indexOf(existingVote);
      this.votes.splice(idx, 1);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ userId, vote });
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

Post.methods.document.set('changeContribution', function (user, role, contributionString) {
  const contributionObject = this.participants.find(item => item.userId.equals(user.id));
  if (contributionObject) {
    contributionObject.role = role;
    contributionObject.contributions = contributionString;
  }
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

module.exports = Post;

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



