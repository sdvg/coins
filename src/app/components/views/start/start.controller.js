function StartController ($state, account) {
  'ngInject'

  account.isSignedIn().then(isSignedIn => {
    if (isSignedIn) {
      $state.go('overview')
    }
  })
}

export default StartController
