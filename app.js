var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pg = require('pg');

var indexRouter = require('./routes/index');
var produtos = require('./routes/produtos');
var estoque = require('./routes/estoque');
var cliente = require('./routes/cliente');
var fornecedores = require('./routes/fornecedores');
var financeiro = require('./routes/financeiro');
var orcamentos = require('./routes/orcamentos');
var pedidos = require('./routes/pedidos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pedidos', pedidos);
app.use('/produtos', produtos);
app.use('/estoque', estoque);
app.use('/clientes', cliente);
app.use('/fornecedores', fornecedores);
app.use('/financeiro', financeiro);
app.use('/orcamentos', orcamentos);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
