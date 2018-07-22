# teduna
teduna

## 使い方
```
git clone https://github.com/tomatoaiu/teduna.git
cd teduna
npm i
touch .env            #.envファイル作成　この中にシークレットなキーを入れる
```

## .envファイル以下みたいに記入
CHANNELACCESSTOKENがlineのアクセストークン
CHANNELSECRETがlineのChannel Secret
```
CHANNELACCESSTOKEN=asdfghjk123456789
CHANNELSECRET=12345678qwertyuio
```


## 変更したい場合
```sh
node server.js

# トンネリング
# https://hogehogeで出できたurlをコピー, lineのサイトへ行って Webhook urlをhttps://hogehoge/webhookに変更
ngrok http 3000

# デプロイ
# https://hogehogeで出できたurlをコピー, lineのサイトへ行って Webhook urlをhttps://hogehoge/webhookに変更
now
```

## 参考サイト
- 1時間でLINE BOTを作るハンズオン (資料+レポート) in Node学園祭2017 #nodefest - Qiita, 入手先 https://qiita.com/n0bisuke/items/ceaa09ef8898bee8369d. (参照日 2018-7-21)
