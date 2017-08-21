function tagsFactory ($q, hoodie) {
  'ngInject'

  const store = hoodie.store('tag')

  const getWeightedTagIds = () => {
    const expensesStore = hoodie.store('expense')

    return $q.all([store.findAll(), expensesStore.findAll()]).then(([tags, expenses]) => {
      const tagIds = {}
      for (const tag of tags) {
        tagIds[tag.id] = 0
      }

      for (const expense of expenses) {
        tagIds[expense.tag] += 1
      }

      return tagIds
    })
  }

  const getCount = () => {
    return store.findAll().then(tags => tags.length)
  }

  return {
    add () {
      return $q.when(store.add.apply(store, arguments))
    },
    update () {
      return $q.when(store.update.apply(store, arguments))
    },
    findAll () {
      return $q.when(store.findAll.apply(store, arguments))
    },
    find () {
      return $q.when(store.find.apply(store, arguments))
    },
    remove () {
      return $q.when(store.remove.apply(store, arguments))
    },
    getSorted () {
      const promise = store.findAll.apply(store, arguments).then(tags => {
        return getWeightedTagIds().then(weightedTags => {
          return tags
            .sort((a, b) => { // first sort by name
              return a.name < b.name ? -1 : 1
            })
            .sort((a, b) => { // then by number of expenses
              return weightedTags[b.id] - weightedTags[a.id]
            })
        })
      })

      return $q.when(promise)
    },
    getCount
  }
}

export default function (app) {
  app.factory('tags', tagsFactory)
}
