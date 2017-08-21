import angular from 'angular'
import ExpenseController from './expense.controller'
import expenseTpl from './expense.html'
import './expense.scss'

export default angular
  .module('expense', [])
  .component('expense', {
    templateUrl: expenseTpl,
    controller: ExpenseController
  })
