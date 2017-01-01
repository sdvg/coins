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
    require('./components/header/header').name,

    // routes
    require('./index.routes').name,

    // pages
    require('./pages/start/start.module').name,
    require('./pages/overview/overview.module').name,
    require('./pages/expense/expense.module').name,
    require('./pages/tags/tags.module').name,
    require('./pages/data/data.module').name,
    require('./pages/sign-up/sign-up.module').name,
    require('./pages/sign-in/sign-in.module').name
  ]
)
  .config(config)
  .constant('appConfig', appConfig);
