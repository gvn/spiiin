angular.module('spiiin', [])
  .directive('radSpinner', function () {
    return {
      restrict: 'E',
      scope: {
        dataFailed: '=radSpinnerDataFailed', // Truthy value will cause an error message to show
        delay: '=radSpinnerDelay', // Delay before showing spinner (In MS)
        data: '=radSpinnerData', // Spinner will only show if this data is undefined
        timeout: '=radSpinnerTimeout' // How long the spinner will show before a warning appears (In MS)
      },
      templateUrl: 'spinner.html',
      link: function ($scope, el) {
        $scope.isTimedOut = false;

        el.hide().fadeTo(0,0);

        var revealDelay = setTimeout(function() {
          el.fadeTo(200, 1);
        }, $scope.delay);

        var errorDelay = setTimeout(function () {
          $scope.isTimedOut = true;
          $scope.$apply();
        }, $scope.timeout)

        $scope.$watch('data', function () {
          if (typeof $scope.data !== 'undefined') {
            clearTimeout(revealDelay);
            clearTimeout(errorDelay);

            el.hide();
          }
        });
      }
    };
  })
