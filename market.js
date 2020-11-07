
//websocket server initial
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function () {
    console.log('Подключился новый пользователь');
});

wss.broadcast = function (data) {
    wss.clients.forEach(function (client) {
        //if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        //}
    });
};



//bittrex api initial
var bittrex = require('node.bittrex.api');
bittrex.options({
    'apikey': '',
    'apisecret': '',
    'stream': true, // will be removed from future versions 
    'verbose': true,
    'cleartext': false
});



exports.connect = function (req, res, next) {


    bittrex.websockets.listen(function (data) {
        if (data.M === 'updateSummaryState') {
            data.A.forEach(function (data_for) {
                data_for.Deltas.forEach(function (marketsDelta) {
                    //console.log('Ticker Update for '+ marketsDelta.MarketName, marketsDelta);
                    wss.broadcast(JSON.stringify(data_for));
                });
            });
        }
    });
    //bittrex subscribe

    bittrex.websockets.subscribe(['BTC-ETH', 'BTC-SC', 'BTC-ZEN'], function (data) {
        if (data.M === 'updateExchangeState') {
            data.A.forEach(function (data_for) {
                //console.log('Market Update for ' + data_for.MarketName, data_for);
                //wss.broadcast(JSON.stringify(data_for));
                //wss.clients.forEach(function (client) {
                //    client.send(JSON.stringify(data_for));
                //});
                //ws.send('12345');
            });
        }
    });

};

exports.showJSON = function (req, res, next) {
    res.json(bittrex);
};

