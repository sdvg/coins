import config from './index.config';
import appConfig from './index.app-config';

export default angular.module('expenses',
  [
    // plugins
    require('angular-ui-router'),
    require('angular-validation-match'),
    require('angular-eha.capitalize').name,

    // core
    require('./core/core.module').name,
    require('./core/directives/linkElement/link-element.directive').name,

    // components
    require('./components/views/start/start').name,
    require('./components/views/sign-up/sign-up').name,
    require('./components/views/sign-in/sign-in').name,
    require('./components/views/overview/overview').name,
    require('./components/views/expense/expense').name,
    require('./components/views/tags/tags').name,
    require('./components/views/data/data').name,
    require('./components/header/header').name,

    // routes
    require('./index.routes').name,
  ]
)
  .config(config)
  .constant('appConfig', appConfig);
