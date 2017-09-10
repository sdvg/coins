import angular from 'angular'
import StartController from './start.controller'
import startTpl from './start.html'
import './start.scss'

import reactToAngular from './reactToAngular'
import test from '../../../react/test';

export default angular
  .module('start', [])
  .component('start', {
    templateUrl: startTpl,
    controller: StartController
  })
  .component('startReact', reactToAngular(test))
