var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res) {
  pool.connect(function(err, client,done){
  client.query('SELECT prod.idproduto as idproduto,prod.descricao as descricao,prod.precocusto, prod.precorevenda, prod.precocliente, mat.descricao as materia FROM produto as prod inner join materiaprima as mat on (prod.idmateriaprima = mat.idmateriaprima) order by idproduto ASC;',function(err, result){
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
  pool.connect(function(err,client, done){
         client.query('SELECT * FROM materiaprima', function(err,result){
             if(err){
                 console.log(err);
             }
      res.render('produtos/cadProduto', {
      title: 'Cadastrar Novo Produto',
      materiaprima: result});
    });
   });
});

router.post('/addProduto',function(req,res){
var nome = req.body.nome;
var cpf = req.body.cpf;
var telefone = req.body.telefone;
var endereco = req.body.endereco;
var email = req.body.email;
pool.connect(function(err, client,done){
  client.query('INSERT INTO produto (nome,cpf,telefone,endereco,email) VALUES ($1,$2,$3,$4,$5);',[nome,cpf,telefone,endereco,email],function(err, result){
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



module.exports = router; 