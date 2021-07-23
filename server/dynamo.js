const dynamoose = require('dynamoose');
require('dotenv').config()

// setup region and credentials
dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'us-east-2'
  });

module.exports = dynamoose;