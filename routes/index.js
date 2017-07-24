var express = require('express');
var router = express.Router();
var market = require('../market');

/* GET home page. */
router.get('/', market.showJSON); 

module.exports = router;
