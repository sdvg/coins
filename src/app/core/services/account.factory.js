function accountFactory($q, hoodie) {
  'ngInject';

  const account = hoodie.account;

  return {
    signUp() {
      return $q.when(account.signUp.apply(account, arguments));
    },
    signIn() {
      return $q.when(account.signIn.apply(account, arguments));
    },
    isSignedIn() {
      return hoodie.account.isSignedIn();
    }
  };
}

export default function (app) {
  app.factory('account', accountFactory);
}
