import download from 'in-browser-download';
import moment from 'moment';
import { omit } from 'lodash';

function ExportImportController($timeout, hoodie, expenses, tags) {
  'ngInject';

  /** placeholder for <input> $element */
  this.importJsonInput = null;

  const statNumbers = {
    tags: null,
    expenses: null
  };

  tags.getCount().then(count => {
    statNumbers.tags = count;
  });

  expenses.getCount().then(count => {
    statNumbers.expenses = count;
  });

  this.areStatNumbersReady = () => statNumbers.tags !== null && statNumbers.expenses !== null;
  this.getExpensesCount = () => statNumbers.expenses;
  this.getTagsCount = () => statNumbers.tags;

  this.exportJson = () => {
    hoodie.store.findAll().then(data => {
      download(
        JSON.stringify(data),
        `coins-export-${moment().format('YYYY-MM-DD')}.json`,
        `application/json`
      );
    });
  };

  this.eraseData = () => {
    if (confirm('Are you sure that you want to delete all tags and expenses?')) {
      hoodie.store.removeAll().then(
        () => {
          alert('Erased all data.');
        },
        error => {
          console.error(error);
          alert('Error while erasing data.');
        }
      );
    }
  };

  $timeout(() => {
    this.importJsonInput.on('change', changeEvent => {
      const file = changeEvent.target.files[0];
      const reader = new FileReader();

      reader.onload = readerEvent => {
        // todo: keep ids
        // todo: error handling
        // todo: prevent duplicates
        const importData = JSON.parse(readerEvent.target.result);
        console.log('import', importData);

        importData.forEach(item => {
          // hoodie.store.add(omit(item, ['id', '_rev']));
        });
      };

      reader.readAsText(file);
    });
  });
}

export default ExportImportController;
