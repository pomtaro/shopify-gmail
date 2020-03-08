'use strict';

const {google} = require('googleapis');
const gmail = google.gmail('v1');

exports.sendMessage = async function(oauth2Client, emailAddress, lastName) {
    // 送信前の各種準備
    const makeBody = (params) => {
        params.subject = new Buffer(params.subject).toString("base64"); //日本語対応

        const str = [
            `Content-Type: text/plain; charset=\"UTF-8\"\n`,
            `MIME-Version: 1.0\n`,
            `Content-Transfer-Encoding: 7bit\n`,
            `to: ${params.to} \n`,
            `from: ${params.from} \n`,
            `subject: =?UTF-8?B?${params.subject}?= \n\n`,
            params.message
        ].join('');
        return new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    };

    // メール本文
    const messageBody = `
    ${lastName} 様

    この度はご購入下さりありがとうございます。

    ${lastName}様に1日でも早くお届けできるよう・・・

    よろしくお願い致します。
    `;

    // 送信先、送信元、件名、本文をセット
    const raw = makeBody({
        to: emailAddress,
        from: '<送信元のメールアドレス>',
        subject: 'api test',
        message: messageBody
    });

    // 送信
    await gmail.users.messages.send({
        auth: oauth2Client,
        userId: 'me',
        resource: {
            raw: raw
        }
    });
};