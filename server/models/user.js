const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const dynamoose = require("../dynamo");

const userSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => uuid.v4(),
    hashKey: true // primary key
  },
  username: { 
    type: String, 
    required: true, 
    index: {
      name: 'usernameIdx',
      global: true
    }
  },
  password: { 
    type: String, 
    required: true,
    set: async (rawPassword) => await bcrypt.hash(rawPassword, 10),
  },
  admin: {
    type: Boolean,
    default: false
  }
}, { collation: { locale: 'en', strength: 1 } });

const User = dynamoose.model('User', userSchema);

User.methods.document.set("isValidPassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

module.exports = User;
