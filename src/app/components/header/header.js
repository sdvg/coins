import HeaderController from './header.controller';
import headerTpl from './header.html';
import './header.scss';

export default angular.module('header-module', [])
  .component('appHeader', {
    controller: HeaderController,
    controllerAs: 'headerCtrl',
    templateUrl: headerTpl
  });
