import signUpTpl from './sign-up.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('signUp', {
      url: '/signUp',
      templateUrl: signUpTpl,
      controller: require('./sign-up.controller'),
      controllerAs: 'signUp'
    });
}

export default routeConfig;
