'use strict';

function routeConfig($locationProvider, $urlRouterProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}

export default angular
  .module('index.routes', [])
    .config(routeConfig);

