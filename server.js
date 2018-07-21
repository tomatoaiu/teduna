'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const env = require('node-env-file');
const PORT = process.env.PORT || 3000;

env(__dirname + '/.env');
const config = {
    channelAccessToken: process.env.CHANNELACCESSTOKEN,
    channelSecret: process.env.CHANNELSECRET
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
