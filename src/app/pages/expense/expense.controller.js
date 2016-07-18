'use strict';

function ExpenseController($scope, $state, $stateParams, expenses, tags) {
  'ngInject';

  if($stateParams.id) {
    expenses.find($stateParams.id).then(
      (expense) => {
        this.expense = {
          ...expense,
          date: new Date(expense.date)
        };
      },
      () => {
        $state.go('start');
      }
    );
  }
  else {
    this.expense = {
      date: new Date()
    };
  }

  tags.findAll().then((allTags) => {
    this.availableTags = allTags;
  });

  this.submit = (expense) => {
    const method = expense.id ? 'update' : 'add';
    expenses[method](expense).then(() => $state.go('overview'));
  };
}

export default ExpenseController;
