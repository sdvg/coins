import { mapValues } from 'lodash';

const dataFactory = ($q, hoodie) => {
  'ngInject';

  const storesReady = hoodie.ready.then(() => ({
    expense: hoodie.store('expense'),
    tag: hoodie.store('tag')
  }));

  const wrapStore = (store, method) => (...args) => storesReady.then(
    stores => stores[store][method].apply(stores[store], args)
  );

  /** tags */
  const findTag = wrapStore('tag', 'find');
  const findAllTags = wrapStore('tag', 'findAll');
  const addTag = wrapStore('tag', 'add');
  const updateTag = wrapStore('tag', 'update');
  const removeTag = wrapStore('tag', 'remove');

  const getWeightedTagIds = () => {
    return storesReady
      .then(stores => $q.all([
        stores.tag.findAll(),
        stores.expense.findAll()
      ]))
      .then(([tags, expenses]) => {
        const tagIds = {};
        for (const tag of tags) {
          tagIds[tag.id] = 0;
        }

        for (const expense of expenses) {
          tagIds[expense.tag] += 1;
        }

        return tagIds;
      });
  };

  const findSortedTags = () => {
    return storesReady
      .then(stores => $q.all({
        tags: stores.tag.findAll(),
        weightedTagIds: getWeightedTagIds()
      }))
      .then(({tags, weightedTagIds}) => {
        return tags
          .sort((a, b) => { // first sort by name
            return a.name < b.name ? -1 : 1;
          })
          .sort((a, b) => { // then by number of expenses
            return weightedTagIds[b.id] - weightedTagIds[a.id];
          });
      });
  };

  /** expenses */
  const findExpense = wrapStore('expense', 'find');
  const findAllExpenses = wrapStore('expense', 'findAll');
  const addExpense = wrapStore('expense', 'add');
  const updateExpense = wrapStore('expense', 'update');
  const removeExpense = wrapStore('expense', 'remove');

  const findExpensesByMonth = date => {
    const year = date.getYear();
    const month = date.getMonth();

    const promise = findAllExpenses().then(data => {
      return data
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getYear() === year && expenseDate.getMonth() === month;
        })

        .map(expense => {
          return findTag(expense.tag).then(
            tag => {
              expense.tagData = tag;
              return expense;
            },
            err => {
              console.error('Tag for expense not found.', err);
            });
        });
    });

    return promise.then(promises => $q.all(promises));
  };

  const onExpenseUpdate = callback => {
    storesReady.then(stores => {
      stores.expense.on('change', callback);
    });

    /** unsubscribe function */
    return () => {
      storesReady.then(stores => {
        stores.expense.off('change', callback);
      });
    }
  };

  return {
    /** map methods results in $q promises */
    ...mapValues(
      {
        findTag,
        findAllTags,
        findSortedTags,
        addTag,
        updateTag,
        removeTag,
        findExpense,
        findAllExpenses,
        findExpensesByMonth,
        addExpense,
        updateExpense,
        removeExpense,
        onExpenseUpdate
      },
      method => (...args) => $q.when(method.apply(undefined, args))
    ),
    onExpenseUpdate
  };
};

export default app => {
  app.factory('dataFactory', dataFactory);
};
