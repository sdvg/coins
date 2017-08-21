import angular from 'angular'
import SignUpController from './sign-up.controller'
import signUpTpl from './sign-up.html'
import './sign-up.scss'

export default angular
  .module('signUp', [])
  .component('signUp', {
    templateUrl: signUpTpl,
    controller: SignUpController
  })
