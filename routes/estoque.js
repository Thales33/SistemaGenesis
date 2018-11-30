var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('estoque', { title: 'Estoque - Genesis Laser' });
});

module.exports = router;