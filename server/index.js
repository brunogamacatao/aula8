import express      from 'express';
import logger       from 'morgan';
import path         from 'path';
import compression  from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import mongoose     from 'mongoose';
import config       from './config';

// Abre uma conexão com o banco de dados
mongoose.connect(config.URL_BANCO_DE_DADOS);

// Espera abrir a conexão com o banco de dados
mongoose.connection.once('open', function() {
  console.log('Conexão aberta com sucesso !');
  
  var app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(compression()); // Ligar a compressão gzip

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../build')));

  // URL_BASE, DEFINIÇÃO DAS ROTAS
  app.use('/pessoas', require('./routes/pessoas'));

  app.use(pageForFoundErrorHandler);
  app.use(generalErrorHandler);

  // Inicia o servidor web
  app.listen(3000, function() {
    console.log('Servidor ouvindo na porta 3000');
  });
});

// Funções para tratamento de erro

// Página não encontrada
function pageForFoundErrorHandler(err, req, res, next) {
  if (!err) {
    var err = new Error('Página não encontrada');
    err.status = 404;
    next(err);
  } else {
    next(err);
  }
}

// Erros em geral
function generalErrorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: err, message: err.message, stack: err.stack});  
}
