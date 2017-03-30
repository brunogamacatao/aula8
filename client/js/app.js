import angular from 'angular'; // Importa o angular
import 'angular-ui-router';    // Importa o roteador

import './services';    // Importa os serviços
import './controllers'; // Importa os controladores

// Cria a aplicação
const app = angular.module('aula8', [
    'ui.router', 'aula8.services', 'aula8.controllers'
]);

// Configura as rotas
app.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listagem', {
                url: '/',
                templateUrl: 'listagem.html',
                controller: 'PessoasController'
            })
            .state('formulario', {
                url: '/formulario',
                templateUrl: 'formulario.html',
                controller: 'PessoasController'
            });
        $urlRouterProvider.otherwise('/');
    }
]);