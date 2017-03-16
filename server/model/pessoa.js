var mongoose = require('mongoose');

var PessoaSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  ativo: Boolean
});

module.exports = mongoose.model('Pessoa', PessoaSchema);