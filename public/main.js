angular.module('searchModule', [])
  .controller('searchController', function($scope) {
    $scope.userReq = '';
    $scope.submit = function() {
      if ($scope.text) {
        $scope.userReq = this.text;
        $scope.text = '';
      }
    console.log($scope.userReq);
    };
  });