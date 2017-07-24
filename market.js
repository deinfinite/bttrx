
//websocket server initial
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function () {
    console.log('Подключился новый пользователь');
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};



//bittrex api initial
var bittrex = require('node.bittrex.api');
bittrex.options({
    'apikey' : '2ff005835a454caeaeb55b0285a83d95',
    'apisecret' : '455b08ede7fa4656a8285bebea83eaec', 
    'stream' : true, // will be removed from future versions 
    'verbose' : true,
    'cleartext' : false 
});



exports.connect = function (req, res, next) {
 


    //broadcast

    //bittrex subscribe

    bittrex.websockets.subscribe(['BTC-ETH', 'BTC-SC', 'BTC-ZEN'], function (data) {
        if (data.M === 'updateExchangeState') {
            data.A.forEach(function (data_for) {
                //console.log('Market Update for ' + data_for.MarketName, data_for);
                //wss.broadcast(JSON.stringify(data_for));
                wss.broadcast('12345');
            });
        }
    });

};

exports.showJSON = function (req, res, next) {
    res.json(bittrex); 
};

