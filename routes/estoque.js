var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto,prod.descricao, SUM(estoque.quantidade) as quantidade FROM produto as prod, estoque WHERE prod.idproduto = estoque.idproduto GROUP BY prod.idproduto ORDER BY prod.idproduto ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
 	}
  res.render('estoque/homeEstoque', { title: 'Estoque - Studio STX' ,
estoques: result});
   });
  });
});  

router.get('/cadEstoque', function(req,res){
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto,prod.descricao FROM produto as prod ORDER BY prod.idproduto ASC;',function(err, result){
    done();
    if(err){
      console.log(err.stack);
  }
      res.render('estoque/cadEstoque', {
    	title: 'Atualizar Estoque',
      produtos: result});
    });
   });
  });
router.post('/attEstoque',function(req,res){
var produto = req.body.produto;
var quantidade = req.body.quantidade

pool.connect(function(err, client,done){
	client.query('INSERT INTO estoque (idproduto,quantidade) VALUES ($1,$2);',[produto,quantidade],function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
  		res.send('Erro ao atualizar Estoque');
  	}else{
     res.redirect('/estoque')
  	}
  });
 });
});

module.exports = router;