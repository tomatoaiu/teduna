'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const { config, fbConfig } = require('./config')
const PORT = process.env.PORT || 3000;

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type === 'follow') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `友だち登録ありがとうございます(happy)
      TEDUNAは，集合住宅居住者向けコミュニケーションアプリです
      
      まずは，郵便番号と建物名を以下のように入力してください(star)
      例：100-8111/皇居`
    });

  }else if (event.type !== 'message' || event.message.type !== 'text') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text //実際に返信の言葉を入れる箇所
    });
  }
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
