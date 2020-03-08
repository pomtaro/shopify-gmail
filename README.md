
# 主な手順

- shopifyプライベートアプリ作成
- Gmail API設定
- メール本文設定
- 実行

# shopifyプライベートアプリ作成

shopify管理画面にて、アプリ管理 > プライベートアプリを管理する、に遷移し、アプリを作成する。  
APIキーとパスワードを取得する。

# Gmail API設定

下記ページ1、2、3を参考に設定する。  
https://dotstud.io/blog/gmail-api-from-nodejs/  
一言で言うと、Google Developer Consoleでclient_secret.jsonを入手して、それをroot/googleapi/に配置し、root/getAndStoreToken.jsを実行して、gmail-nodejs-quickstart.jsonを入手すれば完了。  
root/getAndStoreToken.jsは既に作成済み。  

# メール本文設定

root/googleapi/gmailSend.jsで本文を設定する。  
24行目の```const messageBody```を書き換える。  
37行目の```<送信元のメールアドレス>```も書き換える。

# 実行

main.jsが実行ファイル。  
```<shop_name>```、```<api_key>```、```<password>```を設定する。  
```node main.js```により、実行日から2週間前に注文した人に対してメールが送信される。  
