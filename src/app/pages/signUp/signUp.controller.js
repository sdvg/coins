'use strict';

function SignUpController($state, account) {
  'ngInject';

  this.submit = (user) => {
    const credentials = {
      username: user.email,
      password: user.password
    };

    account.signUp(credentials).then(
        () => {
          hoodie.account.signIn(credentials).then(
              () => $state.go('overview'),
              (error) => {
                this.errorMessage = `You have been signed up successful but the following error occurred at auto-login:
                                     ${error.message}`;
              }
          );
        },
        (error) => {
          this.errorMessage = {
            HoodieConflictError: 'An account with the email-address ' + user.email + ' already exists.',
            ConnectionError: 'Could not connect to server.'
           }[error.name] || error.message;

          if(error.name === 'HoodieConflictError') {
            this.form.email.$dirty = true;
            this.form.email.$setValidity('unique', false);
          }
        }
    );
  };

  this.resetEmailValidation = () => {
    this.form.email.$setValidity('unique', true);
  };
}

export default SignUpController;
