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
    res.render('financeiro/homeFinanceiro', { title: 'Financeiro - Genesis Laser',contas: result });
  });
 }); 
});
module.exports = router;