var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
 pool.connect(function(err, client,done){
  client.query('SELECT * FROM fornecedor order by idfornecedor ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
 	}
  res.render('fornecedores/homeFornecedores', { title: 'Fornecedores - Studio STX',
fornecedores: result});
  });
 });
}); 

router.get('/cadFornecedor', function(req,res){
      res.render('fornecedores/cadFornecedor', {
    	title: 'Cadastrar Novo Fornecedor'
    });
   });

router.post('/addFornecedor',function(req,res){
var nome = req.body.nome;
var cpf = req.body.cpf;
var telefone = req.body.telefone;
var endereco = req.body.endereco;
var email = req.body.email;
var site = req.body.site;
pool.connect(function(err, client,done){
	client.query('INSERT INTO fornecedor (nome,cnpj,telefone,endereco,email,site) VALUES ($1,$2,$3,$4,$5,$6);',[nome,cpf,telefone,endereco,email,site],function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
  		res.send('Erro ao adicionar Fornecedor no Sistema');
  	}else{
     res.redirect('/fornecedores/homeFornecedores')
  	}
  });
 });
});

module.exports = router;