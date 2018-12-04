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


module.exports = router;