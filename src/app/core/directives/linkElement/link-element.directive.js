export default angular.module('linkElement', [])
  .directive('linkElement', () => ({
    restrict: 'A',
    scope: {
      linkElement: '='
    },
    link: (scope, element) => {
      scope.linkElement = element;
    }
  }));
