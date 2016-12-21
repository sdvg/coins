import route from './sign-in.route';
import './sign-in.scss';

const signInPageModule = angular.module('signIn-module', [
  'ui.router'
]);

signInPageModule
    .config(route);

export default signInPageModule;
