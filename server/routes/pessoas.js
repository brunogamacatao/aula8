/**
 * Esse script contém a implementação de uma API rest para o recurso 'Pessoa'.
 * Esta é uma API muito padrão que pode ser utilizada por outros recursos com
 * poucas modificações.
 * 
 * +------------+------+-------------------------------------------------+
 * | Verbo HTTP | URL | Função                                           |
 * +------------+------+-------------------------------------------------+
 * | GET        | /    | Retorna todas as pessoas                        |
 * | GET        | /:id | Retorna a pessoa com o id informado             |
 * | DELETE     | /:id | Remove a pessoa com o id informado              |
 * | POST       | /    | Incliu uma nova pessoa                          |
 * | PUT        | /:id | Atualiza os dados da pessoa com o id informado  |
 * +------------+------+-------------------------------------------------+
 */

import express from 'express'; // Importando a biblioteca Express
import Pessoa from '../model/pessoa'; // Importando o model Pessoa

var router = express.Router(); // Criando um 'roteador'

// GET / - Retorna todas as pessoas
router.get('/', function(req, res, next) {
  Pessoa.find().exec(function(err, pessoas) {
    if (err) {
      return next(err);
    }

    res.json(pessoas);
  });
});

// POST / - Inclui uma nova pessoa
router.post('/', function(req, res, next) {
  new Pessoa(req.body).save(function(err, pessoa) {
    if (err) {
      return next(err);
    }

    res.json(pessoa);
  });
});

/**
 * Função muito importante. Muitas funções realizam uma mesma tarefa: obtém uma
 * pessoa a partir do id passado na url. O express router provê uma forma de 
 * interceptar requisições sempre que um determinado parâmetro for especificado
 * na URL. Nesse caso, sempre que a URL contiver o parâmetro 'id', uma busca
 * será feita ao banco de dados, e a pessoa recuperada será adicionada ao 
 * request, para que as funções possam utilizá-la.
 */
router.param('id', function(req, res, next, id) {
  Pessoa.findById(id).exec(function (err, pessoa) { // Busca a pessoa pelo id
    if (err) { 
      return next(err); 
    }

    if (!pessoa) { // Caso não exista a pessoa, lançar um erro
      return next(new Error('Não foi possível encontrar a pessoa com o id informado')); 
    }

    req.pessoa = pessoa; // Adiciona a pessoa ao request
    return next(); // Passa o controle para a função apropriada
  });
});

// GET /:id - Retorna a pessoa com o id informado
router.get('/:id', function(req, res, next) {
  res.json(req.pessoa); // Simplesmente retorna a pessoa do request
});

router.delete('/:id', function(req, res, next) {
  req.pessoa.remove(function(err, pessoa) {
    if (err) {
      return next(err);
    }

    res.json(req.pessoa);
  });
});

// PUT /:id - Atualiza os dados da pessoa com o id informado
router.put('/:id', function(req, res, next) {
  req.pessoa.update(req.body, function(err, pessoa) {
    if (err) {
      return next(err);
    }

    res.json(pessoa);
  });
});

module.exports = router; // Exporta o 'router' devidamente configurado