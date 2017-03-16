import angular from 'angular';
import 'angular-resource'; // Importa o angular resource

// Cria o módulo
const services = angular.module('aula8.services', ['ngResource']);

services.factory('Pessoa', ['$resource', function($resource) {
  return $resource('/pessoas/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // habilita requisições PUT
    }
  }); // Endereço completo da API do serviço
}]);