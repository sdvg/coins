'use strict';

function ExpenseController($scope, $state, $stateParams, expenses, tags) {
  'ngInject';

  this.isNew = !$stateParams.id;

  if(!this.isNew) {
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

  tags.getSorted().then((allTags) => {
    this.availableTags = allTags;
  });

  this.submit = (expense) => {
    const method = expense.id ? 'update' : 'add';
    expenses[method](expense).then(() => $state.go('overview'));
  };

  this.remove = (expense) => {
    if(confirm('Are you sure that you want to remove this expense?')) {
      expenses.remove(expense.id).then(() => $state.go('overview'));
    }
  };
}

export default ExpenseController;
