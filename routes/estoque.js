var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto,prod.descricao, SUM(estoque.quantidade) as quantidade FROM produto as prod, estoque WHERE prod.idproduto = estoque.idproduto GROUP BY prod.idproduto ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
 	}
  res.render('estoque', { title: 'Estoque - Genesis Laser' });
});

module.exports = router;