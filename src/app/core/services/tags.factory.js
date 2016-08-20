function tagsFactory($q, hoodie) {
  'ngInject'

  const store = hoodie.store('tag');

  const getWeightedTagIds = () => {
    const expensesStore = hoodie.store('expense');

    return $q.all([store.findAll(), expensesStore.findAll()]).then(([tags, expenses]) => {
      const tagIds = {};
      for (let tag of tags) {
        tagIds[tag.id] = 0;
      }

      for (let expense of expenses) {
        tagIds[expense.tag] += 1;
      }

      return tagIds;
    });
  };

  return {
    add: function () {
      return $q.when(store.add.apply(store, arguments));
    },
    update: function () {
      return $q.when(store.update.apply(store, arguments));
    },
    findAll: function () {
      return $q.when(store.findAll.apply(store, arguments));
    },
    find: function () {
      return $q.when(store.find.apply(store, arguments));
    },
    remove: function () {
      return $q.when(store.remove.apply(store, arguments));
    },
    getSorted: function () {
      const promise = store.findAll.apply(store, arguments).then(tags => {
        return getWeightedTagIds().then(weightedTags => {
          return tags
            .sort((a, b) => { //first sort by name
              return a.name < b.name ? -1 : 1;
            })
            .sort((a, b) => { //then by number of expenses
              return weightedTags[b.id] - weightedTags[a.id];
            });
        });
      });

      return $q.when(promise);
    }
  };
}

export default function (app) {
  app.factory('tags', tagsFactory);
}
