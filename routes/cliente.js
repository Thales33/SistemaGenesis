var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cliente', { title: 'Clientes - Genesis Laser' });
});

module.exports = router; 