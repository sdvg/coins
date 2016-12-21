import tagsTpl from './tags.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('tags', {
      url: '/tags/',
      templateUrl: tagsTpl,
      controller: require('./tags.controller'),
      controllerAs: 'tags'
    });
}

export default routeConfig;
