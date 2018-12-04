var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});
//process.env,DATABASE_URL

router.get('/', function(req, res) {
  pool.connect(function(err, client,done){
  client.query('SELECT ped.idpedido as idpedido,ped.preco as preco, ped.desconto as desconto, cli.nome as nome FROM pedido as ped inner join cliente as cli on (ped.idcliente = cli.idcliente) order by idpedido ASC;',function(err, result){
  	done();
  	if(err){
  		console.log(err.stack);
 	}
  	res.render('pedidos/homePedidos', {
	  title: 'Pedidos - Genesis Laser'
	 ,pedidos: result
	});
     });
   });
  });
   
  router.get('/addPedido',function(req,res){
  //	poll.connect(process.env.DATABASE_URL, function(err,client, done){
  //	 client.query('SELECT * FROM Produto', function(err,result){
  //	 	if(err){
  //	 		console.log(err);
  //	 	}
  //	 client.query('SELECT * FROM Cliente', function(err,resultado){
  //	 	done();
  //	 	if(err){
  //	 		console.log(err);
  //	 	}
  	  res.render('pedidos/addPedido',{
  	  	title: 'Cadastrar Novo Pedido'
  //	  	,produtos: result,
  //	  	clientes: resultado
  	  });	
  	 });
  //	 })	
  //	})
 // })

  //router.get('/pedidoCliente',function(req,res){
  //	poll.connect(process.env.DATABASE_URL, function(err,client, done){
  //	 client.query('SELECT * FROM Pedido inner join Cliente on (Pedido.idcliente = Cliente.idcliente order by ASC) ', function(err,result){
  //	 	done();
  //	 	if(err){
  //	 		console.log(err);
  //	 	}
  //	 res.render('pedidos/addPedido',{
  //	  	title: 'Consulta de Pedido por Cliente',
  //	  	produtos: result,
  //	  	clientes: resultado
  //	  });	
  //	 });
  //	 });	
  //	});

  


module.exports = router;
