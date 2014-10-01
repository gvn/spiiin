angular.module('rad.spiiin', [])
  .directive('radSpinner', function () {
    return {
      restrict: 'E',
      scope: {
        dataLoading: '=radSpinnerDataLoading', // Truthy value will show spinner
        dataFailed: '=radSpinnerDataFailed', // Truthy value will cause an error message to show
        timeout: '=radSpinnerTimeout' // How long the spinner will show before a warning appears (In MS)
      },
      // Since templateUrl is relative to the view, the path has to be manually set in the HTML
      templateUrl: function(element, attr) {
        return attr.radSpinnerTemplate;
      },
      link: function ($scope, el) {
        var serviceTimeout;

        function preload() {
          clearTimeout(serviceTimeout);
          $scope.isTimedOut = false;

          serviceTimeout = setTimeout(function () {
            $scope.isTimedOut = true;
            $scope.$apply();
          }, $scope.timeout);
        }

        $scope.$watch('dataLoading', function (newValue, oldValue) {
          if (newValue === true) {
            preload();
          } else if (newValue === false) {
            clearTimeout(serviceTimeout);
            $scope.isTimedOut = false;
          }
        });
      }
    };
  });
