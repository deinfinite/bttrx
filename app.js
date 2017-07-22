var ccxt = require('ccxt');
var bittrex = new ccxt.bittrex({
    apiKey: '2ff005835a454caeaeb55b0285a83d95',
    secret: '455b08ede7fa4656a8285bebea83eaec',
}); 

//bittrex.api.public + bittrex.api.account + bittrex.api.market 
var makeRequest = async () => {
  try {
    // парсинг JSON может вызвать ошибку
    var bittrexProducts = await bittrex.loadProducts ();
    
    console.log (bittrex.id,    bittrexProducts);
    console.log (Object.keys (bittrex));


  } catch (err) {
    console.log(err)
  }
};


makeRequest();
1
//bittrex.api.public + bittrex.api.account + bittrex.api.market 
