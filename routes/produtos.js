var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res) {
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto as idproduto,prod.descricao as descricao,prod.precocusto as precocusto, prod.precorevenda as precorevenda, prod.precocliente as precocliente FROM produto as prod order by idproduto ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack)
 	}
  	res.render('produtos/homeProdutos', {
	  title: 'Produtos - Studio STX'
	 ,produtos: result
	});
     });
   });
  });

router.get('/cadProduto', function(req,res){
        res.render('produtos/cadProduto', {
      title: 'Cadastrar Novo Produto'});
    });
   

router.post('/addProduto',function(req,res){
var descricao = req.body.descricao;
var precocusto = req.body.precocusto;
var precorevenda = req.body.precorevenda;
var precocliente = req.body.precocliente;
pool.connect(function(err, client,done){
  client.query('INSERT INTO produto (descricao,precocusto,precorevenda,precocliente) VALUES ($1,$2,$3,$4);',[descricao,precocusto,precorevenda,precocliente],function(err, result){
    done();
    if(err){
      console.log(err.stack);
      res.send('Erro ao adicionar Produto no Sistema');
    }else{
     res.redirect('/produtos/homeProdutos')
    }
  });
 });
});  

router.get('/editar/:id', function(req, res) {
  var id = req.params.id;
  pool.connect(function(err, client,done){
  client.query('SELECT * FROM produto WHERE idproduto = $1;',[id],function(err, result){
    done();
    if(err){
      console.log(err.stack)
    }
    res.render('produtos/editarProduto', {
    title: 'Produtos - Studio STX',produto: result[0] });
     });
   });
  });




module.exports = router; 