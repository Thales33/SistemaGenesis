var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
 pool.connect(function(err, client,done){
  client.query('SELECT * FROM contas order by idconta ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
 	}
    res.render('financeiro/homeFinanceiro', { title: 'Financeiro - Studio STX',contas: result });
  });
 }); 
});

router.get('/cadConta', function(req,res){
      res.render('financeiro/cadConta', {
    	title: 'Cadastrar Nova Conta'
    });
   });

router.post('/addConta',function(req,res){
var tipo = req.body.tipo;
var valor = req.body.valor;
var descricao = req.body.descricao;
var vencimento = req.body.datavencimento;
pool.connect(function(err, client,done){
	client.query('INSERT INTO contas (tipo,valor,descricao,datavencimento) VALUES ($1,$2,$3,$4);',[tipo,valor,descricao,vencimento],function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
  		res.send('Erro ao adicionar Conta no Sistema');
  	} else{
     res.redirect('/financeiro/homeFinanceiro')
  	}
  });
 });
});

module.exports = router;