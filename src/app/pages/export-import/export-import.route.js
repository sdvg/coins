import ExportImportController from './export-import.controller';
import exportImportTpl from './export-import.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('exportImport', {
      url: '/export-import',
      templateUrl: exportImportTpl,
      controller: ExportImportController,
      controllerAs: 'exportImportCtrl'
    });
}

export default routeConfig;
