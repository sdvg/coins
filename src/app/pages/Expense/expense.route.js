import expenseTpl from './expense.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('addExpense', {
      url: '/expense/add',
      templateUrl: expenseTpl,
      controller: require('./expense.controller'),
      controllerAs: 'expense'
    })
    .state('editExpense', {
      url: '/expense/:id',
      templateUrl: expenseTpl,
      controller: require('./expense.controller'),
      controllerAs: 'expense'
    });
}

export default routeConfig;
