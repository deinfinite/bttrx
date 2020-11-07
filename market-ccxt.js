var ccxt = require('ccxt');
var bittrex = new ccxt.bittrex({
    apiKey: '',
    secret: '',
    timeout: '30000'
});
var curr;
var bittrexProducts =
    async () => {
        try {
            // парсинг JSON может вызвать ошибку

            bittrexProducts = await bittrex.loadProducts();
            console.log(bittrexProducts);

            return bittrexProducts;
        } catch (err) {

            // swallow connectivity exceptions only
            if (err instanceof ccxt.DDoSProtectionError || err.message.includes('ECONNRESET')) {
                console.log('[DDoS Protection Error] ' + err.message)
            } else if (err instanceof ccxt.TimeoutError) {
                console.log('[Timeout Error] ' + err.message)
            } else if (err instanceof ccxt.AuthenticationError) {
                console.log('[Authentication Error] ' + err.message)
            } else if (err instanceof ccxt.MarketNotAvailableError) {
                console.log('[Market Not Available Error] ' + err.message)
            } else if (err instanceof ccxt.EndpointNotAvailableError) {
                console.log('[Endpoint Not Available Error] ' + err.message)
            } else {
                throw err; // rethrow all other exceptions
            }
        };
        return bittrexProducts;
    };



exports.connect = function (req, res, next) {
    //bittrex.api.public + bittrex.api.account + bittrex.api.market 
    bittrexProducts();
    //curr = bittrex.api.public.get.currencies();
   // (async () => {
   //     console.log(await (bittrex.fetchTicker('BTC/USD'))) // ticker for BTC/USD
    //    let symbols = Object.keys(bittrex.products)
    //    let random = Math.floor((Math.random() * symbols.length)) - 1
  ///      console.log(bittrex.fetchTicker(symbols[random])) // ticker for a random symbol
  //  })();
    
};

exports.showJSON = function (req, res, next) {
    res.json(bittrex); 
};

