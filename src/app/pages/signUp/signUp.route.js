'use strict';

import signUpTpl from './signUp.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('signUp', {
      url: '/signUp',
      templateUrl: signUpTpl,
      controller: require('./signUp.controller'),
      controllerAs: 'signUp'
    });

}

export default routeConfig;
