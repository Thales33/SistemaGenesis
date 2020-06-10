var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
  pool.connect(function(err, client,done){
  client.query('SELECT * FROM cliente order by idcliente ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
 	}

    res.render('clientes/homeClientes', { title: 'Clientes - Studio STX',clientes: result });
   });
  });
}); 

router.get('/cadCliente', function(req,res){
      res.render('clientes/cadCliente', {
    	title: 'Cadastrar Novo Cliente'
    });
   });

router.post('/addCliente',function(req,res){
var nome = req.body.nome;
var cpf = req.body.cpf;
var telefone = req.body.telefone;
var endereco = req.body.endereco;
var email = req.body.email;
pool.connect(function(err, client,done){
	client.query('INSERT INTO cliente (nome,cpf,telefone,endereco,email) VALUES ($1,$2,$3,$4,$5);',[nome,cpf,telefone,endereco,email],function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
  		res.send('Erro ao adicionar Cliente no Sistema');
  	} else{
     res.redirect('/clientes/homeClientes')
  	}
  });
 });
});





module.exports = router; 