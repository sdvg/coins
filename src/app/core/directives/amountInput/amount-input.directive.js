import angular from 'angular'

export default angular.module('amountInput', [])
  .directive('amountInput', ($filter) => {
    'ngInject'

    return {
      restrict: 'A',
      require: '?ngModel',
      link: (scope, elem, attrs, ctrl) => {
        ctrl.$formatters.push(() => {
          return $filter('number')(ctrl.$modelValue)
        })

        ctrl.$parsers.unshift(function (viewValue) {
          const plainNumber = parseInt(viewValue.replace(/[^\d]/g, '')) / 100
          elem.val($filter('number')(plainNumber, 2));

          return plainNumber;
        });
      }
    }
  })
