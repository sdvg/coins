import headerTpl from './header.html';
import './header.scss';

export default angular.module('header-module', [])
  .component('appHeader', {
    templateUrl: headerTpl
  });
