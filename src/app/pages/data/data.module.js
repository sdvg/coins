import route from './data.route';
import './data.scss';

export default angular
  .module('data-module', ['ui.router'])
  .config(route);
