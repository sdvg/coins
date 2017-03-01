function TagsController($timeout, tags) {
  'ngInject';

  tags.getSorted().then(allTags => {
    this.tags = allTags;
  });

  this.saveTag = tag => {
    if (tag.id) {
      tags.update(tag).then(
          doc => {
            const tagIdx = this.tags.findIndex(_tag => _tag.id === tag.id);
            this.tags[tagIdx] = doc;
          },
          err => {
            throw err;
          }
      );
    } else {
      tags.add(tag);
    }
  };

  this.removeTag = tag => {
    const tagIdx = this.tags.findIndex(_tag => _tag.id === tag.id);

    if (tag.id) {
      tags.remove(tag).then(() => {
        this.tags.splice(tagIdx, 1);
      });
    } else { // not saved yet
      this.tags.splice(tagIdx, 1);
    }
  };

  this.addTag = () => {
    this.tags.push({name: ''});

    // focus new input
    $timeout(() => {
      const inputs = document.querySelectorAll('#tags-list input');
      const inputsArray = Array.from(inputs);
      inputsArray.pop().focus();
    });
  };
}

export default TagsController;