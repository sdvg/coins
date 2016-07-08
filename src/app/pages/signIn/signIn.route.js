import signInTpl from './signIn.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('signIn', {
      url: '/signIn',
      templateUrl: signInTpl,
      controller: require('./signIn.controller'),
      controllerAs: 'signIn'
    });

}

export default routeConfig;
