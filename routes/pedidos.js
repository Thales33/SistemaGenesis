var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});
  //process.env,DATABASE_URL
  
  router.get('/', function(req, res) {
    pool.connect(function(err, client,done){
    client.query('SELECT ped.idpedido as idpedido,ped.preco as preco, ped.desconto as desconto, cli.nome as nome,status.descricao as status FROM pedido as ped INNER JOIN cliente as cli on (ped.idcliente = cli.idcliente) INNER JOIN status on (ped.idstatus = status.idstatus) order by idpedido ASC;',function(err, result){
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
     
  router.get('/cadPedido',function(req,res){
    pool.connect(function(err,client, done){
       client.query('SELECT * FROM cliente', function(err,resultado){
             done();
             if(err){
                 console.log(err);
             }
       
          res.render('pedidos/cadPedido',{
              title: 'Cadastrar Novo Pedido'
              ,clientes: resultado
          });    
         });
         });    
        });
    
  router.post('/add',function(req,res){
      var idcliente = req.body.idcliente;
      var idstatus = 1;
      var desconto = req.body.desconto;
      var preco= 0;
      pool.connect(function(err, client, done){
      client.query('INSERT INTO pedido (idcliente,idstatus,desconto,preco) VALUES ($1,$2,$3,$4)', [idcliente,idstatus,desconto,preco], function(err, result) {
      done();
      if (err){
        console.log(err);
        res.send('Erro ao adicionar Pedido ao Banco Dados');
      }else{
       res.redirect('/pedidos/adcProd');
       }
      });
     });
  });   

  router.get('/adcProd',function(req,res){
    pool.connect(function(err,client, done){
       client.query('SELECT prod.idproduto,prod.descricao, SUM(estoque.quantidade) as quantidade FROM produto as prod, estoque WHERE prod.idproduto = estoque.idproduto GROUP BY prod.idproduto ORDER BY prod.idproduto ASC', function(err,result){
             done();
             if(err){
                 console.log(err);
             }
       
          res.render('pedidos/cadPedido',{
              title: 'Adicionar itens ao Pedido'
              ,estoques: result
          });    
         });
         });    
        });
      
  
  
  router.get('/pedidoCliente',function(req,res){
        pool.connect(process.env.DATABASE_URL, function(err,client, done){
         client.query('SELECT * FROM pedido inner join Cliente on (Pedido.idcliente = Cliente.idcliente order by ASC) ', function(err,result){
             done();
             if(err){
                 console.log(err);
             }
         res.render('pedidos/homePedidos',{
              title: 'Consulta de Pedido por Cliente',
              clientes: result
         });    
     });
    });    
  });
  
  module.exports = router;