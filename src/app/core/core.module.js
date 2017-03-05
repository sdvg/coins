const shared = angular.module('core.shared', []);

require('./services/hoodie.factory')(shared);
require('./services/data.factory')(shared);
require('./services/account.factory')(shared);

export default shared;
