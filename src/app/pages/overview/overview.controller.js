import {orderBy, groupBy} from 'lodash';
import {toWordsOrdinal} from 'number-to-words';

function OverviewController(expenses) {
  'ngInject';

  let currentDate = new Date();
  this.monthExpenses = null;
  this.expensesByDay = null;

  const getCurrentMonth = () => {
    this.currentDate = currentDate;

    expenses.findByMonth(currentDate).then(expenses => {
      const orderedExpenses = orderBy(expenses, 'date', 'desc');

      this.expensesByDay = groupBy(orderedExpenses, expense => {
        const date = new Date(expense.date);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      });

      this.monthExpenses = expenses
          .map(val => val.amount)
          .reduce((prev, curr) => prev + curr, 0);
    });
  };

  getCurrentMonth();
  expenses.onUpdate(getCurrentMonth);

  this.goPrev = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    getCurrentMonth();
  };
  this.goNext = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    getCurrentMonth();
  };

  this.numberToWordsOrdinal = timestamp => {
    return toWordsOrdinal(new Date(parseInt(timestamp)).getDate());
  };
}

export default OverviewController;
