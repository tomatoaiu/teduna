'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const utils = require('./utils');
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
      text: `友だち登録ありがとうございます٩( ᐛ )و\nTEDUNAは，集合住宅居住者向けコミュニケーションアプリです\n\n郵便番号と建物名を以下のように入力してください\n例：100-8111/皇居`
    });

  } else if (event.type == 'message' || event.message.type == 'text') {
    let msg = event.message.text;
    let conf = msg.split("/");
    if (msg.match(/^[0-9]{3}-?[0-9]{4}\/.+/)) {
      var res = utils.isExistDatabaseAsyc(conf[0], conf[1]);
      if (res.exist) {
        utils.appendUser(event.source.userId, res.key);
      } else {
        utils.createBuilding(event.source.userId, conf[0], conf[1]);
      }

      client.replyMessage(event.replyToken, {
        type: "text",
        text: conf[0] + "\n" + conf[1] + "\n" + "を登録しました"
      });
    }

    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text //実際に返信の言葉を入れる箇所
    });
  }
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
