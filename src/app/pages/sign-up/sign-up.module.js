import route from './sign-up.route';
import './sign-up.scss';

const signUpPageModule = angular.module('signUp-module', [
  'ui.router'
]);

signUpPageModule
    .config(route);

export default signUpPageModule;
