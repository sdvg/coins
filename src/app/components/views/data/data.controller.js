import download from 'in-browser-download'
import moment from 'moment'
import { omit } from 'lodash'

export default class DataController {
  constructor (
    $q,
    dataFactory
  ) {
    'ngInject'

    this.$q = $q
    this.dataFactory = dataFactory
  }

  $onInit () {
    this.statNumbers = {
      tags: null,
      expenses: null
    }

    /** placeholder for <input> $element */
    this.importJsonInput = null

    this.fetchStatNumbers()
  }

  fetchStatNumbers () {
    this.dataFactory.getTagCount().then(count => {
      this.statNumbers.tags = count
    })

    this.dataFactory.getExpenseCount().then(count => {
      this.statNumbers.expenses = count
    })
  }

  areStatNumbersReady () {
    return this.statNumbers.tags !== null && this.statNumbers.expenses !== null
  }

  getExpensesCount () {
    return this.statNumbers.expenses
  }

  getTagsCount () {
    return this.statNumbers.tags
  }

  exportJson () {
    this.dataFactory.findAllData().then(data => {
      download(
        JSON.stringify(data),
        `coins-export-${moment().format('YYYY-MM-DD')}.json`,
        `application/json`
      )
    })
  }

  eraseData () {
    if (window.confirm('Are you sure that you want to delete all tags and expenses?')) {
      this.dataFactory.removeAllData().then(
        () => {
          window.alert('Erased all data.')
          this.fetchStatNumbers()
        },
        error => {
          console.error(error)
          window.alert('Error while erasing data.')
        }
      )
    }
  }

  importJsonInputReady ($element) {
    const importItem = item => {
      return this.dataFactory.updateOrAdd(omit(item, ['_rev']))
    }

    const importItems = items => {
      const importItemPromises = items.map(item => {
        return this.dataFactory.find(item.id).then(
          existingItem => {
            if (existingItem.updatedAt <= item.updatedAt) {
              return importItem(item)
            }
          },
          () => importItem(item)
        )
      })

      return this.$q.all(importItemPromises)
    }

    $element.on('change', changeEvent => {
      const file = changeEvent.target.files[0]

      if (file.type !== 'application/json') {
        window.alert('Import failed (file is not of type JSON)')

        return
      }

      const reader = new window.FileReader()

      reader.onload = readerEvent => {
        let jsonData

        try {
          jsonData = JSON.parse(readerEvent.target.result)
        } catch (error) {
          window.alert('Import failed (file not readable)')

          return
        }

        importItems(jsonData).then(
          () => {
            window.alert('Data successfully imported!')
            this.fetchStatNumbers()
          },
          error => {
            console.error('import:', error)
            window.alert('Import failed')
          }
        )
      }

      reader.readAsText(file)
    })
  }
}
