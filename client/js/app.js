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
            .state('login', {
                url: '/',
                templateUrl: 'usuarios/login.html',
                controller: 'LoginController',
                authenticate: false
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutController',
                authenticate: false
            })
            .state('register', {
                url: '/register',
                templateUrl: 'usuarios/novo.html',
                controller: 'RegisterController',
                authenticate: false
            })
            .state('listagem', {
                url: '/listagem',
                templateUrl: 'pessoas/listagem.html',
                controller: 'PessoasController',
                authenticate: true
            })
            .state('formulario', {
                url: '/formulario',
                templateUrl: 'pessoas/formulario.html',
                controller: 'PessoasController',
                authenticate: true
            })

        $urlRouterProvider.otherwise('/');
    }
]);

// Configuração da autenticação
app.run([
    '$rootScope', '$state', 'AuthService',  // Dependências
    function ($rootScope, $state, AuthService) { // Implementação
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate) {
                function handleLogout() {
                    AuthService.setUserStatus(false);
                    $rootScope.$emit('logout');
                    $state.transitionTo('login');
                    event.preventDefault();        
                }

                AuthService.getUserStatus().then(function success(data) {
                    if (data.data.status) {
                        AuthService.setUserStatus(true);
                        $rootScope.$emit('login');
                    } else {
                        handleLogout();
                    }
                }, handleLogout);
            }
        });
    }
]);