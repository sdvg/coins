import StartController from './start.controller';
import startTpl from './start.html';
import './start.scss';

export default angular
  .module('start', [])
  .component('start', {
    templateUrl: startTpl,
    controller: StartController
  });
