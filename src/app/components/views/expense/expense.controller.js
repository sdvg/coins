function ExpenseController ($scope, $state, $stateParams, dataFactory) {
  'ngInject'

  this.isNew = !$stateParams.id

  if (this.isNew) {
    this.expense = {
      date: new Date()
    }
  } else {
    dataFactory.findExpense($stateParams.id).then(
      expense => {
        this.expense = {
          ...expense,
          date: new Date(expense.date)
        }
      },
      () => {
        $state.go('start')
      }
    )
  }

  dataFactory.findSortedTags().then(allTags => {
    this.availableTags = allTags
  })

  this.submit = expense => {
    const method = expense.id ? 'updateExpense' : 'addExpense'
    dataFactory[method](expense).then(() => $state.go('overview'))
  }

  this.remove = expense => {
    if (window.confirm('Are you sure that you want to remove this expense?')) {
      dataFactory.removeExpense(expense.id).then(() => $state.go('overview'))
    }
  }
}

export default ExpenseController
