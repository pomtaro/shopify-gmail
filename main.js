'use strict';

const Shopify = require('shopify-api-node');
const moment = require("moment-timezone");
const gAuth = require('./googleapi/gAuth');
const gmailSend = require('./googleapi/gmailSend');

// moment設定
moment.tz.setDefault("Asia/Tokyo");
const nowDate = moment();
const twoWeeksAgoDate = nowDate.add(-14, 'days');

(async () => {
    try {
        // shopifyインスタンス生成
        const shopify =  new Shopify({
            shopName: '<shop_name>',
            apiKey: '<api_key>',
            password: '<password>'
        });
        
        // Gmail Authインスタンス生成
        const oauth2Client = await gAuth.getOauth2Client();

        // 注文情報の取得
        // memo: created_at_maxが2020-01-01の場合、2020-01-01の注文は含まない
        const orders = await shopify.order.list({limit: 250, created_at_min: twoWeeksAgoDate.format(), created_at_max: twoWeeksAgoDate.add(1, 'days').format()});

        // 注文ごとのループ
        for (let i = 0; i < orders.length; i++) {
            const emailAddress = orders[i].email;
            const lastName = orders[i].billing_address.last_name;

            // メール送信実行
            await gmailSend.sendMessage(oauth2Client, emailAddress, lastName);
        };
    } catch (err) {
        console.log(err);
    };
})();
