var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res) {
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto as idproduto,prod.descricao as descricao, prod.peso as peso,prod.precocusto, prod.precorevenda, prod.precocliente, mat.descricao as materia FROM produto as prod inner join materiaprima as mat on (prod.idmateriaprima = mat.idmateriaprima) order by idproduto ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack)
 	}
  	res.render('produtos/homeProdutos', {
	  title: 'Produtos - Genesis Laser'
	 ,produtos: result
	});
     });
   });
  });
   



module.exports = router; 