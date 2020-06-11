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

router.post('/addClientes',function(req,res){
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
     res.redirect('/clientes')
  	}
  });
 });
});

router.get('/editar/:id', function(req, res) {
  var id = req.params.id;
  pool.connect(function(err, client,done){
  client.query('SELECT * FROM cliente WHERE idcliente = '+id+';',function(err, result){
    done();
    if(err){
      console.log(err.stack)
      res.send('Erro ao buscar Cliente no Sistema');
    }
      res.render('produtos/editarCliente', {title: 'Produtos - Studio STX',cliente: result.rows[0]});
       });
   });
  });

router.post('/editarCliente', function(req, res) {
  var id = req.body.idcliente;
  var nome = req.body.nome;
  var cpf = req.body.cpf;
  var telefone = req.body.telefone;
  var endereco = req.body.endereco;
  var email = req.body.email;
   pool.connect(function(err, client,done){
    client.query('UPDATE cliente SET (nome,cpf,telefone,endereco,email) = ($1,$2,$3,$4,$5) WHERE idcliente = $6;',[nome,cpf,telefone,endereco,email,id],function(err, result){
     done();
     if(err){
      console.log(err.stack);
      res.send('Erro ao Editar Produto no Sistema');
    }
      res.redirect('/clientes');
       });
   });
  });






module.exports = router; 