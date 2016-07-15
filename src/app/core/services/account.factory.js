function accountFactory($q, hoodie) {
  'ngInject';

  const account = hoodie.account;

  return {
    signUp: function () {
      return $q.when(account.signUp.apply(account, arguments));
    },
    signIn: function () {
      return $q.when(account.signIn.apply(account, arguments));
    },
    isSignedIn: function () {
      return hoodie.account.isSignedIn();
    }
  };
}

export default function (app) {
  app.factory('account', accountFactory);
}
