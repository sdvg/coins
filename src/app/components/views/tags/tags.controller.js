function TagsController ($timeout, dataFactory) {
  'ngInject'

  dataFactory.findSortedTags().then(allTags => {
    this.tags = allTags
  })

  this.saveTag = tag => {
    if (tag.id) {
      dataFactory.updateTag(tag).then(
          doc => {
            const tagIdx = this.tags.findIndex(_tag => _tag.id === tag.id)
            this.tags[tagIdx] = doc
          },
          err => {
            throw err
          }
      )
    } else {
      dataFactory.addTag(tag)
    }
  }

  this.removeTag = tag => {
    const tagIdx = this.tags.findIndex(_tag => _tag.id === tag.id)

    if (tag.id) {
      dataFactory.removeTag(tag).then(() => {
        this.tags.splice(tagIdx, 1)
      })
    } else { // not saved yet
      this.tags.splice(tagIdx, 1)
    }
  }

  this.addTag = () => {
    this.tags.push({name: ''})

    // focus new input
    $timeout(() => {
      const inputs = document.querySelectorAll('#tags-list input')
      const inputsArray = Array.from(inputs)
      inputsArray.pop().focus()
    })
  }
}

export default TagsController
