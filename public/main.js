
angular.module('searchModule', [])
  .factory('searchFactory', function($http) {
    var makeRequest = function(reqString, $scope) {
      var userReq = reqString.split(' ').join('+');
      var userUrl = "https://www.googleapis.com/books/v1/volumes?q=" + userReq;

      $http({
        method: 'GET',
        url: userUrl
      }).then(function filterData(response) {
          var apiResponse = [];
          var response = response.data.items;
          for (var i = 0; i < response.length; i++) {
            var volInfo = response[i].volumeInfo;
            if ("title" in volInfo && "authors" in volInfo && "imageLinks" in volInfo && "pageCount" in volInfo && "description" in volInfo) {
              apiResponse.push(volInfo);
            }
          }
          console.log(apiResponse);
          $scope.apiResponse = apiResponse;
        }, function errorCallback(response) {
          console.log('Error Getting Data');
        });
    };
    return { makeRequest: makeRequest };
  })

  .controller('searchController', function($scope, searchFactory) {
    $scope.userReq = function() {
      var reqString = '';
      if ($scope.text) {
        reqString = this.text;
        $scope.text = '';
      }
      searchFactory.makeRequest(reqString, $scope);
    };
  });


  // Actually didn't need
  // This is done to keep $scope correctly linked
  // setTimeout(function() {
  //   $scope.apiResponse = apiResponse;
  //   $scope.$apply();
  // }, 50);

// response.data.items
// response.data.items[0]
//   - volumeInfo
//     - .title
//     - .authors[0]
//     - .imagelinks.thumbnail
//     - .pagecount