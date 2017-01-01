import OverviewController from './overview.controller';
import overviewTpl from './overview.html';
import './overview.scss';

export default angular
  .module('overview', [])
  .component('overview', {
    templateUrl: overviewTpl,
    controller: OverviewController
  });
