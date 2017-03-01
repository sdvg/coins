import download from 'in-browser-download';
import moment from 'moment';
import { omit } from 'lodash';

export default class DataController {
  constructor(
    hoodie,
    expenses,
    tags
  ) {
    'ngInject';

    this.hoodie = hoodie;
    this.expenses = expenses;
    this.tags = tags;
  }

  $onInit() {
    this.statNumbers = {
      tags: null,
      expenses: null
    };

    /** placeholder for <input> $element */
    this.importJsonInput = null;

    this.tags.getCount().then(count => {
      this.statNumbers.tags = count;
    });

    this.expenses.getCount().then(count => {
      this.statNumbers.expenses = count;
    });
  }

  areStatNumbersReady() {
    return this.statNumbers.tags !== null && this.statNumbers.expenses !== null;
  }

  getExpensesCount() {
    return this.statNumbers.expenses;
  }

  getTagsCount() {
    return this.statNumbers.tags;
  }

  exportJson() {
    this.hoodie.store.findAll().then(data => {
      download(
        JSON.stringify(data),
        `coins-export-${moment().format('YYYY-MM-DD')}.json`,
        `application/json`
      );
    });
  }

  eraseData() {
    if (confirm('Are you sure that you want to delete all tags and expenses?')) {
      this.hoodie.store.removeAll().then(
        () => {
          alert('Erased all data.');
        },
        error => {
          console.error(error);
          alert('Error while erasing data.');
        }
      );
    }
  }

  importJsonInputReady($element) {
    $element.on('change', changeEvent => {
      const file = changeEvent.target.files[0];
      const reader = new FileReader();

      reader.onload = readerEvent => {
        const importData = JSON.parse(readerEvent.target.result);

        // @todo: success / error handling
        importData.forEach(item => {
          hoodie.store.updateOrAdd(item);
        });
      };

      reader.readAsText(file);
    });
  }
}
