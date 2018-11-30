var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('financeiro', { title: 'Financeiro - Genesis Laser' });
});

module.exports = router;