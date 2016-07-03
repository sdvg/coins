'use strict';

import route from './signUp.route';
import './signUp.scss';

const signUpPageModule = angular.module('signUp-module', [
  'ui.router'
]);

signUpPageModule
    .config(route);

export default signUpPageModule;
