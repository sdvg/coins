import overviewTpl from './overview.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('overview', {
      url: '/overview',
      templateUrl: overviewTpl,
      controller: require('./overview.controller'),
      controllerAs: 'overview'
    });

}

export default routeConfig;
