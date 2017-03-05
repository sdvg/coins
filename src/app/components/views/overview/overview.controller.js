import { orderBy, groupBy } from 'lodash';
import { toWordsOrdinal } from 'number-to-words';

function OverviewController($scope, $stateParams, $filter, dataFactory) {
  'ngInject';

  this.currentMonth = new Date($stateParams.year, $stateParams.month - 1);

  const previousMonth = new Date(this.currentMonth);
  previousMonth.setMonth(this.currentMonth.getMonth() - 1);
  this.previousMonthLinkParams = {
    year: $filter('date')(previousMonth, 'yyyy'),
    month: $filter('date')(previousMonth, 'MM')
  };

  const nextMonth = new Date(this.currentMonth);
  nextMonth.setMonth(this.currentMonth.getMonth() + 1);
  this.nextMonthLinkParams = {
    year: $filter('date')(nextMonth, 'yyyy'),
    month: $filter('date')(nextMonth, 'MM')
  };

  this.monthExpenses = null;
  this.expensesByDay = null;

  const fetchExpenses = () => {
    dataFactory.findExpensesByMonth(this.currentMonth).then(expenses => {
      if (expenses.length > 0) {
        const orderedExpenses = orderBy(expenses, 'date', 'desc');

        this.expensesByDay = groupBy(orderedExpenses, expense => {
          const date = new Date(expense.date);
          return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        });
      }

      this.monthExpenses = expenses
          .map(val => val.amount)
          .reduce((prev, curr) => prev + curr, 0);
    });
  };

  fetchExpenses();

  const unsubscribeExpenseUpdates = dataFactory.onExpenseUpdate(fetchExpenses);
  $scope.$on('$destroy', unsubscribeExpenseUpdates);

  this.numberToWordsOrdinal = timestamp => {
    return toWordsOrdinal(new Date(parseInt(timestamp, 10)).getDate());
  };
}

export default OverviewController;
