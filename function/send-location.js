const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);

        const lat = data.lat;
        const lon = data.lon;

        const email = "kagage24@gmail.com";  // 自分のメールアドレスに変更

        // ここで位置情報を送信
        const response = await fetch('https://api.mailgun.net/v3/sandbox6e617b49e25b4b1cb7214920736fc7dc.mailgun.org/messages', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from('91edd3b71d9a253ce497e7da9422f0c4-24bda9c7-343a8362').toString('base64')}`,
            },
            body: new URLSearchParams({
                from: 'no-reply@yourdomain.com',
                to: email,
                subject: '位置情報',
                text: `Latitude: ${lat}, Longitude: ${lon}`,
            }),
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "位置情報が送信されました" }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "エラーが発生しました" }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }
};
