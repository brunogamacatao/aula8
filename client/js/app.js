import angular from 'angular'; // Importa o angular

import './services';    // Importa os serviços
import './controllers'; // Importa os controladores

// Cria a aplicação
const app = angular.module('aula8', ['aula8.services', 'aula8.controllers']);