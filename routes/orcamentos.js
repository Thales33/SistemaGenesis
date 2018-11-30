var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req, res, next) {
  res.render('orcamentos', { title: 'Orçamentos - Genesis Laser' });
});

module.exports = router;