'use strict';

function SignInController($scope, $state, account) {
  'ngInject';

  this.submit = (user) => {
    const credentials = {
      username: user.email,
      password: user.password
    };

    account.signIn(credentials).then(
        () => {
          //workaround for https://github.com/hoodiehq/hoodie/issues/503
          location.href = $state.href('overview')
        },

        (error) => {
          console.log(error.name);

          this.errorMessage = {
            ConnectionError: 'Could not connect to server.',
            UnauthorizedError: 'Invalid credentials.'
          }[error.name] || `Login failed. Reason: ${error.message}`;
        }
    );
  }
}

export default SignInController;
