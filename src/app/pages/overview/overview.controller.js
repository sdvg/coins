'use strict';

function OverviewController($scope, expenses, $locale) {
  'ngInject';

  var currentDate = new Date();

  const getCurrentMonth = () => {
    this.currentDate = currentDate;

    expenses.findByMonth(currentDate).then(data => {
      this.expenses = data;
      this.monthExpenses = data
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
}

export default OverviewController;
