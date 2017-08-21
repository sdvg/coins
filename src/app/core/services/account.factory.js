function accountFactory ($q, hoodie) {
  'ngInject'

  const wrapMethod = methodName => (...args) => $q.when(hoodie.ready.then(
    () => hoodie.account[methodName].apply(hoodie.account, args)
  ))

  return {
    signUp: wrapMethod('signUp'),
    signIn: wrapMethod('signIn'),
    isSignedIn: wrapMethod('isSignedIn')
  }
}

export default function (app) {
  app.factory('account', accountFactory)
}
