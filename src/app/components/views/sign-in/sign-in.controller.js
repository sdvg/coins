function SignInController ($state, account) {
  'ngInject'

  account.isSignedIn().then(isSignedIn => {
    if (isSignedIn) {
      $state.go('overview')
    }
  })

  this.submit = user => {
    const credentials = {
      username: user.email,
      password: user.password
    }

    account.signIn(credentials).then(
      () => {
        $state.go('overview')
      },

      error => {
        this.errorMessage = {
          ConnectionError: 'Could not connect to server.',
          UnauthorizedError: 'Invalid credentials.'
        }[error.name] || `Login failed. Reason: ${error.message}`
      }
    )
  }
}

export default SignInController
