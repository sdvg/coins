import route from './expense.route';
import './expense.scss';

const expensePageModule = angular.module('expense-module', [
  'ui.router'
]);

expensePageModule
    .config(route);

export default expensePageModule;
