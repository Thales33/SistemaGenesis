var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto as idproduto,prod.descricao as descricao, prod.peso as peso FROM produto as prod;',function(err, result){
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