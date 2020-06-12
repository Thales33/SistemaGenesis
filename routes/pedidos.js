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
        title: 'Pedidos - Studio STX'
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
      var idcliente = req.body.cliente;
      var idstatus = 1;
      pool.connect(function(err, client, done){
      client.query('INSERT INTO pedido (idcliente,idstatus) VALUES ($1,$2)', [idcliente,idstatus], function(err, result) {
        done();
        if (err){
           console.log(err);
           res.send('Erro ao adicionar Pedido ao Banco Dados');
        }else{
          client.query('SELECT idpedido FROM pedido ORDER BY idpedido DESC LIMIT 1;', function(err,resultado){
             done();
             if(err){
                 console.log(err);
             }                
           res.redirect('/pedidos/adcProd');
        });
       }; 
     });
    });
    });   
     
   

  router.get('/adcProd',function(req,res){
    pool.connect(function(err,client, done){
       client.query('SELECT prod.idproduto,prod.descricao, SUM(estoque.quantidade) as quantidade FROM produto as prod, estoque WHERE prod.idproduto = estoque.idproduto GROUP BY prod.idproduto ORDER BY prod.idproduto ASC;', function(err,result){
             done();
             if(err){
                 console.log(err);
             }
       client.query('SELECT idpedido FROM pedido ORDER BY idpedido DESC LIMIT 1;', function(err,resultado){
             done();
             if(err){
                 console.log(err);
             }                    
          res.render('pedidos/adcProduto',{
              title: 'Adicionar itens ao Pedido'
              ,estoques: result
              ,pedido: resultado.rows[0]
          });    
         });
         });    
        });
      });

   router.post('/addProd',function(req,res){
      var idpedido = req.body.pedido;
      var idproduto = req.body.produto;
      var quantidade = req.body.quantidade
      pool.connect(function(err, client, done){
      client.query('INSERT INTO produtopedido (idpedido,idproduto,quant) VALUES ($1,$2,$3)', [idpedido,idproduto,quantidade], function(err, result) {
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
 router.get('/atualizarStatus/:id', function(req, res) {

  var id = req.params.id;
  pool.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM marca', function(err, retorno) { 
     if (err){
      console.log(err);
     }
    client.query('SELECT * FROM tipo', function(err, resultados) { 
     if (err){
      console.log(err);
     }
    client.query('SELECT * FROM PRODUTOS WHERE idprodutos = $1',[id], function(err, result) {
      done();
      if (err){
      console.log(err);
      console.log("ERRO" +err);

      }

      res.render('produtos/detalhes/:id',{
      produtos : result,
      title: 'Editar Produto',
      marcas: retorno,
      tipos : resultados });
    });
   });
  });
 });
});

router.post('/editarProdutos', function(req,res){
  var idproduto = req.body.idproduto;
  var descricao = req.body.descricao;
  var precocusto = req.body.precoCusto;
  var precovenda = req.body.precoVenda;
  var tipo = req.body.tipo;
  var marca = req.body.marca;

pool.connect(process.env.DATABASE_URL, function(err, client, done){
   client.query('UPDATE PRODUTOS SET descricao = ($1), precocusto = ($2),precovenda = ($3),idtipo = ($4), idmarca = ($5) WHERE idprodutos = $6', [descricao, precocusto, precovenda, tipo, marca, idproduto], function(err, result) {
    done();
    if (err){
      console.log(err);
    }
    res.redirect('/produtos/listprodutos');
  });
 });
});

router.get('/delete/:id',function(req,res){
    
    var id = req.params.id;    
  pool.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query("DELETE FROM PRODUTOS WHERE id = $1",[id],function(err){
      done();
        if(err){
            console.log(err);
        }           
        res.redirect('/produtos/listprodutos');
        console.log('Deletado com sucesso!');
        
      }); 
    });
  }); 

  module.exports = router;