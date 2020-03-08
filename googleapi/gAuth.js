'use strict';

const fs = require('fs');
const {promisify} = require('util');
const {OAuth2Client} = require('google-auth-library');

//promisifyでプロミス化
const readFileAsync = promisify(fs.readFile);

const TOKEN_DIR = __dirname;
const TOKEN_PATH = TOKEN_DIR + '/gmail-nodejs-quickstart.json'; //アクセストークンのファイルを指定

exports.getOauth2Client = async function() {
    //クレデンシャル情報の取得
    const content = await readFileAsync(__dirname+'/client_secret.json'); //クライアントシークレットのファイルを指定
    const credentials = JSON.parse(content); //クレデンシャル

    //認証
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
    const token = await readFileAsync(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);

    return oauth2Client;
};
