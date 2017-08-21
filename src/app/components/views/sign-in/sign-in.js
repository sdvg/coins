import angular from 'angular'
import SignInController from './sign-in.controller'
import signInTpl from './sign-in.html'
import './sign-in.scss'

export default angular
  .module('signIn', [])
  .component('signIn', {
    templateUrl: signInTpl,
    controller: SignInController
  })
