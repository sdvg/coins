import Hoodie from '@hoodie/client';
import PouchDB from 'pouchdb-browser';

function hoodieFactory(appConfig) {
  'ngInject';

  const hoodie = new Hoodie({
    url: appConfig.hoodieUrl,
    PouchDB
  });

  window.hoodie = hoodie;

  return hoodie;
}

export default function (app) {
  app.factory('hoodie', hoodieFactory);
}
