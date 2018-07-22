const env = require('node-env-file');

env(__dirname + '/.env');

module.exports.config = {
  channelAccessToken: process.env.CHANNELACCESSTOKEN,
  channelSecret: process.env.CHANNELSECRET
};

module.exports.fbConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID
}
