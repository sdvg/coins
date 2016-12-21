function StartController($state, account) {
  'ngInject';

  if (account.isSignedIn()) {
    $state.go('overview');
  }
}

export default StartController;
