import angular from 'angular';
import hoodieFactory from './services/hoodie.factory';
import dataFactory from './services/data.factory';
import accountFactory from './services/account.factory';

const shared = angular.module('core.shared', []);

hoodieFactory(shared);
dataFactory(shared);
accountFactory(shared);

export default shared;
