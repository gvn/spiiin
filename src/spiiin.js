angular.module('rad.spiiin', [])
  .directive('radSpinner', function () {
    return {
      restrict: 'E',
      scope: {
        dataLoading: '=radSpinnerDataLoading', // Truthy value will show spinner
        dataFailed: '=radSpinnerDataFailed', // Truthy value will cause an error message to show
        data: '=radSpinnerData', // This data becoming defined causes a success event
        timeout: '=radSpinnerTimeout' // How long the spinner will show before a warning appears (In MS)
      },
      // Since templateUrl is relative to the view, the path has to be manually set in the HTML
      templateUrl: function(element, attr) {
        return attr.radSpinnerTemplate;
      },
      link: function ($scope, el) {
        var serviceTimeout;

        function preload() {
          $scope.isTimedOut = false;

          serviceTimeout = setTimeout(function () {
            $scope.isTimedOut = true;
            $scope.$apply();
          }, $scope.timeout)
        }

        // dataLoading provides an API for running the preload method when it changes to true
        $scope.$watch('dataLoading', function (newValue, oldValue) {
          if (newValue === true) {
            preload();
          }
        })

        $scope.$watch('data', function () {
          if (typeof $scope.data !== 'undefined') {
            clearTimeout(serviceTimeout);
            $scope.isTimedOut = false;
          }
        });
      }
    };
  })
