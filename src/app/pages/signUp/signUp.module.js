'use strict';

import route from './signUp.route';

const signUpPageModule = angular.module('signUp-module', [
  'ui.router'
]);

signUpPageModule
    .config(route);

export default signUpPageModule;
