import overviewTpl from './overview.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('overview', {
      url: '/overview/',
      controller: ($state, $filter) => {
        const currentDate = new Date();

        $state.go('overviewMonth', {
          year: $filter('date')(currentDate, 'yyyy'),
          month: $filter('date')(currentDate, 'MM')
        })
      }
    })
    .state('overviewMonth', {
      url: '/overview/{year}-{month}',
      templateUrl: overviewTpl,
      controller: require('./overview.controller'),
      controllerAs: 'overview'
    });

}

export default routeConfig;
