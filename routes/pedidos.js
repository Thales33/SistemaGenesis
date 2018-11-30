var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = new pg.Pool();
//process.env,DATABASE_URL

router.get('/', function(req, res) {
  pool.connect(process.env.DATABASE_URL, function(err, client,done){
  client.query('SELECT ped.idpedido,ped.preco, ped.desconto, cli.nome FROM Pedidos as ped inner join Cliente as cli on (ped.cliente = cli.idcliente) order by ASC',function(err, result){
  	done();
  	if(err){
  		console.log(err)
  	}
  	res.render('pedidos/homePedidos', {
	  title: 'Pedidos - Genesis Laser',
	  pedidos: result});
     });
   })
  })
   
  router.get('/addPedido',function(req,res){
  	poll.connect(process.env.DATABASE_URL, function(err,client, done){
  	 client.query('SELECT * FROM Produto', function(err,result){
  	 	if(err){
  	 		console.log(err);
  	 	}
  	 client.query('SELECT * FROM Cliente', function(err,resultado){
  	 	done();
  	 	if(err){
  	 		console.log(err);
  	 	}
  	  res.render('pedidos/addPedido',{
  	  	title: 'Cadastrar Novo Pedido',
  	  	produtos: result,
  	  	clientes: resultado
  	  })	
  	 })	
  	 })	
  	})
  })

  router.get('/pedidoCliente',function(req,res){
  	poll.connect(process.env.DATABASE_URL, function(err,client, done){
  	 client.query('SELECT * FROM Pedido inner join Cliente on (Pedido.idcliente = Cliente.idcliente order by ASC) ', function(err,result){
  	 	done();
  	 	if(err){
  	 		console.log(err);
  	 	}
  	 res.render('pedidos/addPedido',{
  	  	title: 'Consulta de Pedido por Cliente',
  	  	produtos: result,
  	  	clientes: resultado
  	  })	
  	 })	
  	 })	
  	})

  


module.exports = router;
