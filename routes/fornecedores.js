var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('fornecedores', { title: 'Fornecedores - Genesis Laser' });
});

module.exports = router;