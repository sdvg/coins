const shared = angular.module('core.shared', []);

require('./services/hoodie.factory')(shared);
require('./services/expenses.factory')(shared);
require('./services/tags.factory')(shared);
require('./services/account.factory')(shared);

export default shared;
