import angular from 'angular';

// Cria o módulo
const controllers = angular.module('aula8.controllers', ['aula8.services']);

// Importa os controladores
require('./principal');
require('./autenticacao');
require('./pessoas');