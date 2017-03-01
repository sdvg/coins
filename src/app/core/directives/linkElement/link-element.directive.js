export default angular.module('linkElement', [])
  .directive('linkElement', () => ({
    restrict: 'A',
    scope: {
      linkElement: '&'
    },
    bindToController: true,
    controller: function ($element) {
      'ngInject';

      this.$onInit = () => {
        this.linkElement({ $element });
      };
    }
  }));
