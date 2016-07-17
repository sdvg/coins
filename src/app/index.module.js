'use strict';

import config from './index.config';
import appConfig from './index.appConfig';

const App = angular.module(
  "expenses", [
    // plugins
    require('angular-ui-router'),
    require('angular-validation-match'),

    // core
    require("./core/core.module").name,

    // components
    require("./index.components").name,

    // routes
    require("./index.routes").name,

    // pages
    require("./pages/start/start.module").name,
    require("./pages/overview/overview.module").name,
    require("./pages/expense/expense.module").name,
    require("./pages/tags/tags.module").name,
    require("./pages/signUp/signUp.module").name,
    require("./pages/signIn/signIn.module").name
  ]
);

App
  .config(config)
  .constant('appConfig', appConfig);



export default App;
