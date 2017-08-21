import angular from 'angular'
import DataController from './data.controller'
import dataTpl from './data.html'
import './data.scss'

export default angular
  .module('data', [])
  .component('data', {
    templateUrl: dataTpl,
    controller: DataController,
    controllerAs: 'dataCtrl'
  })
