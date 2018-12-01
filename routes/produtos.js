var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('produtos/homeProdutos', { title: 'Produtos - Genesis Laser' });
});

module.exports = router; 