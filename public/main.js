
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
            if ("title" in volInfo && "authors" in volInfo && "imageLinks" in volInfo && "pageCount" in volInfo) {
              apiResponse.push(volInfo);
            }
          }
          setTimeout(function() {
            $scope.apiResponse = apiResponse;
            $scope.$apply();
            console.log($scope.apiResponse);
          }, 50);
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


  // angular.module('searchModule', [])
  //   .factory('searchFactory', function($http) {
  //     var makeRequest = function(reqString, $scope) {
  //       var userReq = reqString.split(' ').join('+');
  //       var userUrl = "https://www.googleapis.com/books/v1/volumes?q=" + userReq;

  //       $http({
  //         method: 'GET',
  //         url: userUrl
  //       }).then(function filterData(response) {
  //           var apiResponse = [];
  //           var response = response.data.items;
  //           for (var i = 0; i < response.length; i++) {
  //             var volInfo = response[i].volumeInfo;
  //             if ("title" in volInfo && "authors" in volInfo && "imageLinks" in volInfo && "pageCount" in volInfo) {
  //               apiResponse.push(volInfo);
  //             }
  //           }
  //           setTimeout(function() {
  //             $scope.apiResponse = apiResponse;
  //             $scope.$apply();
  //             console.log($scope.apiResponse);
  //           }, 1000);
  //           // $scope.apiResponse = apiResponse;
  //         }, function errorCallback(response) {
  //           console.log('Error Getting Data');
  //         });
  //     };
  //     return { makeRequest: makeRequest };
  //   })

  //   .controller('searchController', function($scope, searchFactory) {
  //     $scope.userReq = function() {
  //       var reqString = '';
  //       if ($scope.text) {
  //         reqString = this.text;
  //         $scope.text = '';
  //       }
  //       searchFactory.makeRequest(reqString, $scope);
  //       console.log($scope.apiResponse);
  //     };
  //   });

// response.data.items
// response.data.items[0]
//   - volumeInfo
//     - .title
//     - .authors[0]
//     - .imagelinks.thumbnail
//     - .pagecount