import download from 'in-browser-download';
import moment from 'moment';

function ExportImportController(hoodie, expenses, tags) {
  'ngInject';

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
}

export default ExportImportController;
