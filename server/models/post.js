const { array } = require("joi");
const uuid = require("uuid");
const dynamoose = require("../dynamo");
const Schema = dynamoose.Schema;

const voteSchema = new Schema({
    userId : String,
    vote : Number
});

const commentSchema = new Schema({
    id: { type: String, required: true },  
    author: { type: String, required: true }, // author username
    body: { type: String, required: true },
    created: { type: Date }  
});

const contributionSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true }, // author username
    role: { type: String, required: true },
    contributions: { type: String, required: true },
    joinedDate: { type: Date }
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
    schema: [voteSchema]
  },
  participants: {
    type: Array,
    schema: [contributionSchema]
  },
  comments: {
    type: Array,
    schema: [commentSchema]
  },
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  type: { type: String, default: 'idea', required: true, index: {
    name: 'typeIdx',
    global: true,
    rangeKey: 'score'
  } },
  text: { type: String },
  upvotePercentage: {type: Number, default: 0}
});

const Post = dynamoose.model('Post', postSchema);



// TODO: Need help with this
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
  // const isJoined = this.participants.find(item => item.userId.equals(user.id));
  const isJoined = this.participants.find(item => item.userId == user.id); // this works

  if (!isJoined) {
    this.participants.push(
      {
        userId: user.id,
        name: user.username,
        role: role,
        contributions: "Full Stack Developer",
        joinedDate: Date.now()
      } 
    );
  }

  return this.save();
});

Post.methods.document.set('leave', function (user) {
  const isJoined = this.participants.find(item => item.userId == user.id); // safe to use '==' here?

  if (isJoined) {
    const idx = this.participants.indexOf(isJoined);
    this.participants.splice(idx, 1);
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
  const id = uuid.v4();
  const created = Date.now();
  this.comments.push({ id, author, body, created });
  return this.save();
});

Post.methods.document.set('removeComment', function (id) {
  const idx = this.comments.findIndex(item => item.id == id);
  if (idx == -1) throw new Error('Comment not found');
  this.comments.splice(idx, 1);
  return this.save();
});

module.exports = Post;
