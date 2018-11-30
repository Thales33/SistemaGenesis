var express = require('express');
var router = express.Router();
var pg = require('pg');
//process.env,DATABASE_URL

router.get('/', function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client,done){
  client.query('SELECT ')
  })
   res.render('pedidos/homePedidos', {
	  title: 'Pedidos - Genesis Laser' });
     });

module.exports = router;
