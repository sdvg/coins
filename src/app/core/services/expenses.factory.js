function expensesFactory($q, hoodie, tags) {
  'ngInject';

  const store = hoodie.store('expense');

  return {
    add: store.add.bind(store),
    update: store.update.bind(store),
    findAll: store.findAll.bind(store),
    find: store.find.bind(store),
    remove: store.remove.bind(store),
    onUpdate: callback => store.on('change', callback),
    unsubscribeUpdate: callback => store.off('change', callback),
    findByMonth
  };

  function findByMonth(date) {
    const year = date.getYear();
    const month = date.getMonth();

    const promise = store.findAll().then((data) => {
      return data
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getYear() === year && expenseDate.getMonth() === month;
        })

        .map(expense => {
          return tags.find(expense.tag).then(tag => {
            expense.tagData = tag;
            return expense;
          });
        })
    });

    return $q.when(promise).then(promises => $q.all(promises));
  }
}

export default function (app) {
  app.factory('expenses', expensesFactory);
}
