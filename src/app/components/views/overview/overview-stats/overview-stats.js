import angular from 'angular'
import OverviewStatsController from './overview-stats.controller'
import overviewStatsTpl from './overview-stats.html'
import './overview-stats.scss'

export default angular
  .module('overviewStats', [])
  .component('overviewStats', {
    templateUrl: overviewStatsTpl,
    controller: OverviewStatsController
  })
