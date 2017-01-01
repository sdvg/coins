import DataController from './data.controller';
import dataTpl from './data.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('data', {
      url: '/data',
      templateUrl: dataTpl,
      controller: DataController,
      controllerAs: 'dataCtrl'
    });
}

export default routeConfig;
