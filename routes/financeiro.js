var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
  res.render('financeiro', { title: 'Financeiro - Genesis Laser' });
});

module.exports = router;