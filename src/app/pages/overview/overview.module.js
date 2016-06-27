import route from './overview.route';
import './overview.scss';

const overviewPageModule = angular.module('overview-module', [
  'ui.router'
]);

overviewPageModule
    .config(route);

export default overviewPageModule;
