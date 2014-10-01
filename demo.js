angular
  .module('testApp', ['rad.spiiin'])
  .controller('testController', ['$scope', function ($scope) {
    var timeout;

    $scope.makeFakeRequest = function () {
      clearTimeout(timeout);

      $scope.dummyData = null;
      $scope.requestInProgress = true;
      $scope.didServiceFail = false;

      timeout = setTimeout(function () {
        // Simulate random failures
        if (Math.random() > 0.3) {
          $scope.dummyData = ['foo', 'bar'];
        } else {
          $scope.didServiceFail = true;
        }

        $scope.requestInProgress = false;
        $scope.$apply();
      }, Math.floor(Math.random() * 15000));
    };
  }]);
