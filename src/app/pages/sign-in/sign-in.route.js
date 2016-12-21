import signInTpl from './sign-in.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('signIn', {
      url: '/signIn',
      templateUrl: signInTpl,
      controller: require('./sign-in.controller'),
      controllerAs: 'signIn'
    });
}

export default routeConfig;
