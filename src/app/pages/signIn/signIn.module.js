import route from './signIn.route';
import './signIn.scss';

const signInPageModule = angular.module('signIn-module', [
  'ui.router'
]);

signInPageModule
    .config(route);

export default signInPageModule;
