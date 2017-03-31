import express      from 'express';
import logger       from 'morgan';
import path         from 'path';
import compression  from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import mongoose     from 'mongoose';
import config       from './config';

// Autenticação
import expressSession from 'express-session';
import passport from 'passport';
import Strategy from 'passport-local';
import Usuario from './model/usuario';

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

  // Recursos estáticos
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../build')));
  app.use(express.static(path.join(__dirname, '../client/templates')));

  // Segurança
  var sessionParams = {
    secret: 'TAP Facisa',
    resave: false,
    saveUnitialized: false
  };
  app.use(expressSession(sessionParams));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new Strategy(Usuario.authenticate()));
  passport.serializeUser(Usuario.serializeUser());
  passport.deserializeUser(Usuario.deserializeUser());

  // URL_BASE, DEFINIÇÃO DAS ROTAS
  app.use('/usuarios', require('./routes/usuarios'));
  app.use('/pessoas', require('./routes/pessoas'));

  app.use(pageForFoundErrorHandler);
  app.use(generalErrorHandler);

  // Inicia o servidor web
  app.listen(config.PORTA_DO_SERVIDOR, function() {
    console.log(`Servidor ouvindo na porta ${config.PORTA_DO_SERVIDOR}`);
    console.log(`Acesse http://localhost:${config.PORTA_DO_SERVIDOR}`);
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
