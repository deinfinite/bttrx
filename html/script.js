
//Скрипт для Webserver
ws = new WebSocket("ws://localhost:8080");
ws.onopen = function () { alert("Connection opened...") };
ws.onclose = function () { alert("Connection closed...") };
ws.onmessage = function (evt) {
    app.message = JSON.parse(evt.data);
    //console.log(evt.data);
};

//ws.onmessage = function (evt) { $("#msg").append("<p>" + evt.data + "</p>"); };
var app = new Vue({
  el: '#app-2',
  data: {
    message: 'Загрузка данных',
    text: {MarketName: ['первый','второй','третий','четвертый']}
  }
});