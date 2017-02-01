export default angular
  .module('index.routes', [])
  .config(($locationProvider, $urlRouterProvider, $stateProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('start', {
        url: '/',
        template: '<start></start>'
      })
      .state('addExpense', {
        url: '/expense/add',
        template: '<expense></expense>'
      })
      .state('editExpense', {
        url: '/expense/:id',
        template: '<expense></expense>'
      })
      .state('overview', {
        url: '/overview/',
        controller: ($state, $filter) => {
          const currentDate = new Date();

          $state.go('overviewMonth', {
            year: $filter('date')(currentDate, 'yyyy'),
            month: $filter('date')(currentDate, 'MM')
          });
        }
      })
      .state('overviewMonth', {
        url: '/overview/{year}-{month}',
        template: '<overview></overview>'
      })
      .state('tags', {
        url: '/tags/',
        template: '<tags></tags>'
      })
      .state('data', {
        url: '/data/',
        template: '<data></data>'
      })
      .state('signUp', {
        url: '/signUp',
        template: '<sign-up></sign-up>'
      })
      .state('signIn', {
        url: '/signIn',
        template: '<sign-in></sign-in>'
      })
    ;
  });

