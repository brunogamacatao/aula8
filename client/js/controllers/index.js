import angular from 'angular';

// Cria o módulo
const controllers = angular.module('aula8.controllers', ['aula8.services']);

// Cria os controladores
controllers.controller('PessoasController', ['$scope', 'Pessoa' , function($scope, Pessoa) {
  $scope.pessoa = {};
  $scope.pessoas = Pessoa.query();
  $scope.filtro = '';
  $scope.ordem = '';

  $scope.ordenaPor = function(campo) {
    $scope.ordem = campo;
  };

  $scope.novo = function() {
    $scope.pessoa = {};
  };

  $scope.selecionar = function(p) {
    $scope.pessoa = p;
  };

  $scope.salvar = function() {
    if ($scope.pessoa._id) { // Atualizar
      $scope.pessoa.$update(function() {
        $scope.pessoa = {};
        $scope.pessoas = Pessoa.query();        
      });
    } else { // Adicionar um novo registro
      Pessoa.save($scope.pessoa, function() {
        $scope.pessoa = {};
        $scope.pessoas = Pessoa.query();
      });
    }
  };

  $scope.excluir = function(p) {
    p.$delete(function() {
      $scope.pessoas = Pessoa.query();
    });
  };
}]);

// Teste Controller
controllers.controller('TesteController', [
  '$scope' , 
  function($scope) {
    // Aqui vem o código do controlador
  }
]);