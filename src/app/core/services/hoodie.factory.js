import Hoodie from '@hoodie/client';

function hoodieFactory (appConfig) {
  'ngInject';

  const hoodie = new Hoodie({
        url: appConfig.hoodieUrl
    });

    window.hoodie = hoodie;

    return hoodie;
}

export default function (app) {
    app.factory('hoodie', hoodieFactory);
}
