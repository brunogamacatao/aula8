import angular from 'angular';
import 'angular-resource'; // Importa o angular resource

// Cria o módulo services
const services = angular.module('aula8.services', ['ngResource']);

/**
 * Serviço Pessoa - funciona como um DAO: Data Access Object
 * Esse serviço utiliza o angular-resource para comunicar-se com o servidor.
 * A configuração do serviço precisa basicamente da URL completa da api do 
 * recurso.
 */
services.factory('Pessoa', ['$resource', ($resource) => {
  return $resource('/pessoas/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // habilita requisições PUT
    }
  }); // Endereço completo da API do serviço
}]);

/**
 * Serviço AuthService - este serviço deve ser injetado sempre que se quiser 
 * realizar a autenticação (ou verificar se há um usuário autenticado na 
 * sessão).
 */
services.factory('AuthService', // Nome do serviço
  ['$q', '$timeout', '$http',   // Dependências do serviço
  ($q, $timeout, $http) => {    // Implementação do serviço

    // Variável para indicar se há usuário ativo na sessão
    var usuario = null;

    // return available functions for use in the controllers
    return ({
      setUserStatus,
      isLoggedIn,
      getUserStatus,
      login,
      logout,
      register
    });

    function isLoggedIn() {
      if (usuario) {
        return true;
      } else {
        return false;
      }
    }

    function setUserStatus(status) {
      usuario = status;
    }

    function getUserStatus() {
      return $http.get('/usuarios/status');
    }

    function login(username, password) {
      // Cria uma nova instância de deferred
      var deferred = $q.defer();

      // Envia uma requisição post para o servidor
      $http.post('/usuarios/login',
        {username, password})
        .then(function success(data, status) { // Em caso de sucesso
          if(data.status === 200 && data.status) {
            usuario = true; // Tem usuário ativo
            deferred.resolve();
          } else {
            usuario = false; // Não tem usuário ativo
            deferred.reject();
          }
        }, function error(data) { // Em caso de erro
          usuario = false; // Não tem usuário ativo
          deferred.reject();
        });

      // Retorna a promise
      return deferred.promise;
    }

    function logout() {
      // Cria uma nova instância de deferred
      var deferred = $q.defer();

      // Envia uma requisição get para o servidor
      $http.get('/usuarios/logout')
        // handle success
        .then(function success(data) {
          user = false;
          deferred.resolve();
        }, function error(data) {
          user = false;
          deferred.reject();
        });

      // Retorna a promise
      return deferred.promise;
    }

    function register(username, password) {
      // Cria uma nova instância de deferred
      var deferred = $q.defer();

      // Envia uma requisição post para o servidor
      $http.post('/usuarios/',
        {username, password})
        .then(function success(data, status) { // Em caso de sucesso
          if(data.status === 200 && data.statusText === 'OK'){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, function error(data) { // Em caso de erro
          deferred.reject();
        });

      // Retorna a promise
      return deferred.promise;
    }
}]);