// index.html page to dist folder
import '!!file-loader?name=[name].[ext]';

// main App module
import './index.module';

import '../assets/styles/sass/index.scss';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['expenses'], {strictDi: true});
});
