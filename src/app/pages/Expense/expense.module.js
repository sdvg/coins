import route from './expense.route';

const expensePageModule = angular.module('expense-module', [
  'ui.router'
]);

expensePageModule
    .config(route);

export default expensePageModule;
