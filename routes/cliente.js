var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('clientes/homeClientes', { title: 'Clientes - Genesis Laser' });
});

module.exports = router; 