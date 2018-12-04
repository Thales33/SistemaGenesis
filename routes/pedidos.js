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
        poll.connect(function(err,client, done){
         client.query('SELECT * FROM produto', function(err,result){
             if(err){
                 console.log(err);
             }
         client.query('SELECT * FROM cliente', function(err,resultado){
             done();
             if(err){
                 console.log(err);
             }
       client.query('SELECT * FROM status', function(err,results){
        if(err){
          console.log(err);
        } 
          res.render('pedidos/addPedido',{
              title: 'Cadastrar Novo Pedido'
              ,produtos: result,
              clientes: resultado,
          status: results
          });    
         });
         });    
        });
     });
    });  
  
  router.post('/add',function(req,res){
      var idcliente = req.body.idcliente;
      var idstatus = req.body.idstatus;
      var desconto = req.body.desconto;
      var preco= req.body.precototal;
      pool.connect(function(err, client, done){
      client.query('INSERT INTO pedido (idcliente,idstatus,desconto,preco) VALUES ($1,$2,$3,$4)', [idcliente,idstatus,desconto,preco], function(err, result) {
      done();
      if (err){
        console.log(err);
        res.send('Erro ao adicionar Produto ao Banco de Dados');
      }else{
       res.redirect('/pedidos/homePedidos');
       }
      });
     });
  });   
  
  
  router.get('/pedidoCliente',function(req,res){
        poll.connect(process.env.DATABASE_URL, function(err,client, done){
         client.query('SELECT * FROM Pedido inner join Cliente on (Pedido.idcliente = Cliente.idcliente order by ASC) ', function(err,result){
             done();
             if(err){
                 console.log(err);
             }
         res.render('pedidos/addPedido',{
              title: 'Consulta de Pedido por Cliente',
              clientes: result
         });    
     });
    });    
  });
  
  module.exports = router;