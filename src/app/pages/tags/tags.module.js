import route from './tags.route';
import './tags.scss';

const tagsPageModule = angular.module('tags-module', [
  'ui.router'
]);

tagsPageModule
    .config(route);

export default tagsPageModule;
