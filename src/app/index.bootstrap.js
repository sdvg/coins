import angular from 'angular';
import './index.module';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['expenses'], {strictDi: true});
});
