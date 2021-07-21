// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const dynamo = require('../dynamo');
const Joi = require('joi');
const dynamoose = require("../dynamo");

const userSchema = new dynamoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean
}, { collation: { locale: 'en', strength: 1 } });

// const Users = dynamo.define('Users', {
//   hashKey : 'username',
//   timestamps : true,
//   schema : {
//     // id       : dynamo.types.uuid(),
//     username : Joi.string(),
//     password : Joi.string(),
//     admin    : Joi.boolean()
//   } 
// });

// dynamo.createTables({
//   'Users': {readCapacity: 20, writeCapacity: 4}
// }, function(err) {
//   if (err) {
//     console.log('Error creating tables: ', err);
//   } else {
//     console.log('Tables has been created');
//   }
// });

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   admin: Boolean
// }, { collation: { locale: 'en', strength: 1 } });

// userSchema.set('toJSON', { getters: true });
// userSchema.options.toJSON.transform = (doc, ret) => {
//   const obj = { ...ret };
//   delete obj._id;
//   delete obj.__v;
//   delete obj.password;
//   return obj;
// };

// userSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isValidPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const User = dynamoose.model('User', userSchema);

module.exports = { User };
