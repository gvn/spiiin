angular
  .module('testApp', ['rad.spiiin'])
  .controller('testController', ['$scope', function ($scope) {
    $scope.makeFakeRequest = function () {
      $scope.requestInProgress = true;
      $scope.didServiceFail = false;

      setTimeout(function () {
        // Simulate random failures
        if (Math.random() > 0.3) {
          $scope.dummyData = true;
        } else {
          $scope.didServiceFail = true;
        }

        $scope.$apply();
      }, Math.floor(Math.random() * 15000));
    }
  }]);
