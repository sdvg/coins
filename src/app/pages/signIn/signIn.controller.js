'use strict';

function SignInController($scope, $state, account) {
  'ngInject';

  this.submit = (user) => {
    const credentials = {
      username: user.email,
      password: user.password
    };

    hoodie.account.signIn(credentials).then(
        () => $state.go('overview'),

        (error) => {
          console.log(error.name);

          this.errorMessage = {
            ConnectionError: 'Could not connect to server.',
            UnauthorizedError: 'Invalid credentials.'
          }[error.name] || `Login failed. Reason: ${error.message}`;

          $scope.$apply();
        }
    );
  }
}

export default SignInController;
