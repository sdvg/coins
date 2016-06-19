'use strict';

import * as components from './index.components';
import config from './index.config';

const App = angular.module(
  "expenses", [
    // plugins
    require('angular-ui-router'),

    // core
    require("./core/core.module").name,

    // components
    require("./index.components").name,

    // routes
    require("./index.routes").name,

    // pages
    require("./pages/start/start.module").name

  ]
);

App
  .config(config);



export default App;
