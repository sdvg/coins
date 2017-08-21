import angular from 'angular'
import './overview-stats/overview-stats'
import OverviewController from './overview.controller'
import overviewTpl from './overview.html'
import './overview.scss'

export default angular
  .module('overview', ['overviewStats'])
  .component('overview', {
    templateUrl: overviewTpl,
    controller: OverviewController
  })
