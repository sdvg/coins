export default class OverviewStatsController {
  constructor(
    $stateParams,
    dataFactory
  ) {
    'ngInject';

    this.$stateParams = $stateParams;
    this.dataFactory = dataFactory;
  }

  $onInit() {
    this.isOpen = false;

    this.getTags().then(tags => {
      const sumOfAllTags = tags.reduce((accumulator, currentValue) => accumulator + currentValue.expensesSum, 0);

      this.tags = tags.map(tag => ({
        ...tag,
        percentageAmount: (100 / sumOfAllTags) * tag.expensesSum,
      }));
    });
  }

  getTags() {
    const currentMonth = new Date(this.$stateParams.year, this.$stateParams.month - 1);

    return this.dataFactory.findTagsByExpensesInMonth(currentMonth);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
