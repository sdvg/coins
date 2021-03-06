import randomColor from 'randomcolor'
import { mapValues } from 'lodash'

const dataFactory = ($q, hoodie) => {
  'ngInject'

  const storesReady = hoodie.ready.then(() => ({
    expense: hoodie.store('expense'),
    tag: hoodie.store('tag')
  }))

  const wrapStore = (store, method) => (...args) => storesReady.then(
    stores => stores[store][method].apply(stores[store], args)
  )

  /** tags */
  const findTag = wrapStore('tag', 'find')
  const findAllTags = wrapStore('tag', 'findAll')
  const addTag = wrapStore('tag', 'add')
  const updateTag = wrapStore('tag', 'update')
  const removeTag = wrapStore('tag', 'remove')

  const getTagCount = () => findAllTags().then(tags => tags.length)

  const getWeightedTagIds = () => {
    return storesReady
      .then(stores => $q.all([
        stores.tag.findAll(),
        stores.expense.findAll()
      ]))
      .then(([tags, expenses]) => {
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

  const findSortedTags = () => {
    return storesReady
      .then(stores => $q.all({
        tags: stores.tag.findAll(),
        weightedTagIds: getWeightedTagIds()
      }))
      .then(({tags, weightedTagIds}) => {
        return tags
          .sort((a, b) => { // first sort by name
            return a.name < b.name ? -1 : 1
          })
          .sort((a, b) => { // then by number of expenses
            return weightedTagIds[b.id] - weightedTagIds[a.id]
          })
      })
      .then(tags => tags.map(tag => ({
        ...tag,
        color: randomColor({ seed: tag.id })
      })))
  }

  /** expenses */
  const findExpense = wrapStore('expense', 'find')
  const findAllExpenses = wrapStore('expense', 'findAll')
  const addExpense = wrapStore('expense', 'add')
  const updateExpense = wrapStore('expense', 'update')
  const removeExpense = wrapStore('expense', 'remove')

  const getExpenseCount = () => findAllExpenses().then(expenses => expenses.length)

  const findExpensesByMonth = date => {
    const year = date.getYear()
    const month = date.getMonth()

    const promise = findAllExpenses().then(data => {
      return data
        .filter(expense => {
          const expenseDate = new Date(expense.date)
          return expenseDate.getYear() === year && expenseDate.getMonth() === month
        })

        .map(expense => {
          return findTag(expense.tag).then(
            tag => {
              expense.tagData = {
                ...tag,
                color: randomColor({ seed: tag.id })
              }
              return expense
            },
            err => {
              console.error('Tag for expense not found.', err)
            })
        })
    })

    return promise.then(promises => $q.all(promises))
  }

  /** Stats */
  const findTagsByExpensesInMonth = date => {
    return findExpensesByMonth(date)
      .then(expenses => {
        return expenses.reduce(
          (accumulator, currentValue) => {
            if (accumulator[currentValue.tag]) {
              accumulator[currentValue.tag].expensesSum += currentValue.amount
            } else {
              accumulator[currentValue.tag] = {
                expensesSum: currentValue.amount,
                ...currentValue.tagData
              }
            }

            return accumulator
          },
          {}
        )
      })
      .then(expensesObject => Object.values(expensesObject))
  }

  const onExpenseUpdate = callback => {
    storesReady.then(stores => {
      stores.expense.on('change', callback)
    })

    /** unsubscribe function */
    return () => {
      storesReady.then(stores => {
        stores.expense.off('change', callback)
      })
    }
  }

  /** general */
  const find = (...args) => hoodie.ready.then(() => hoodie.store.find(...args))
  const findAllData = () => hoodie.ready.then(() => hoodie.store.findAll())
  const removeAll = () => hoodie.ready.then(() => hoodie.store.removeAll())
  const removeAllData = () => hoodie.ready.then(() => hoodie.store.removeAll())
  const updateOrAdd = (...args) => hoodie.ready.then(() => hoodie.store.updateOrAdd(...args))

  return {
    /** map methods results in $q promises */
    ...mapValues(
      {
        addExpense,
        addTag,
        find,
        findAllData,
        findAllExpenses,
        findAllTags,
        findExpense,
        findExpensesByMonth,
        findSortedTags,
        findTag,
        getExpenseCount,
        getTagCount,
        onExpenseUpdate,
        findTagsByExpensesInMonth,
        removeAll,
        removeAllData,
        removeExpense,
        removeTag,
        updateExpense,
        updateOrAdd,
        updateTag
      },
      method => (...args) => $q.when(method.apply(undefined, args))
    ),
    onExpenseUpdate
  }
}

export default app => {
  app.factory('dataFactory', dataFactory)
}
