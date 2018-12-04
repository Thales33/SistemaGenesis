var express = require('express');
var router = express.Router();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL,
ssl: true
});

router.get('/', function(req, res, next) {
	pool.connect(function(err, client,done){
    client.query('SELECT orca.idorcamento, orca.idcliente,orca.preco, status.descricao,cli.nome FROM orcamento as orca inner join cliente as cli on (orca.idcliente = cli.idcliente) inner join status on (orca.idstatus = status.idstatus) order by idorcamento ASC;',function(err, result){
        done();
        if(err){
            console.log(err.stack);
       }
        res.render('orcamentos/homeOrcamentos', {
        title: 'Orçamentos - Genesis Laser'
       ,orcamentos: result
      });
       });
     });
    });

router.get('/addOrcamento',function(req,res){
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
          res.render('orcamentos/addOrcamento',{
              title: 'Cadastrar Novo Orçamento'
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
      client.query('INSERT INTO orcamento (idcliente,idstatus,preco) VALUES ($1,$2,$3,)', [idcliente,idstatus,preco], function(err, result) {
      done();
      if (err){
        console.log(err);
        res.send('Erro ao adicionar Produto ao Banco de Dados');
      }else{
       res.redirect('/oracamentos/homeOrcamentos');
       }
      });
     });
  });   
  
  
  router.get('/pedidoCliente',function(req,res){
        poll.connect(process.env.DATABASE_URL, function(err,client, done){
         client.query('SELECT * FROM orcamento inner join Cliente on (Pedido.idcliente = Cliente.idcliente order by ASC) ', function(err,result){
             done();
             if(err){
                 console.log(err);
             }
         res.render('oracamentos/homeOrcamentos',{
              title: 'Consulta de Orçamento por Cliente',
              clientes: result
         });    
     });
    });    
  });
  


module.exports = router;