import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import angularValidationMatch from 'angular-validation-match';
import angularEhaCapitalize from 'angular-eha.capitalize';

import config from './index.config';
import appConfig from './index.app-config';
import core from './core/core.module';
import routes from './index.routes';
import linkElementDirective from './core/directives/linkElement/link-element.directive';
import StartComponent from './components/views/start/start';
import SignUpComponent from './components/views/sign-up/sign-up';
import SignInComponent from './components/views/sign-in/sign-in';
import OverviewComponent from './components/views/overview/overview';
import ExpenseComponent from './components/views/expense/expense';
import TagsComponent from './components/views/tags/tags';
import DataComponent from './components/views/data/data';
import HeaderComponent from './components/header/header';

angular.module('expenses',
  [
    // plugins
    angularUiRouter,
    angularValidationMatch,
    angularEhaCapitalize.name,

    // core
    core.name,
    linkElementDirective.name,

    // components
    StartComponent.name,
    SignUpComponent.name,
    SignInComponent.name,
    OverviewComponent.name,
    ExpenseComponent.name,
    TagsComponent.name,
    DataComponent.name,
    HeaderComponent.name,

    // routes
    routes.name
  ]
)
  .config(config)
  .constant('appConfig', appConfig);
