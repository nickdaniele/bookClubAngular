angular.module('searchModule', [])
  .factory('searchFactory', function($http) {
    var makeUrl = function(controlScope) {
      var userReq = controlScope.split(' ').join('+');
      var userUrl = "https://www.googleapis.com/books/v1/volumes?q=" + userReq;
      makeRequest(userUrl);
    };
    var makeRequest = function(userUrl) {
      $http({
        method: 'GET',
        url: userUrl
      }).then(function filterData(response) {
          var response = response.data.items;
          var filteredResults = [];
          for (var i = 0; i < response.length; i++) {
            var volInfo = response[i].volumeInfo;
            if ("title" in volInfo && "authors" in volInfo && "imageLinks" in volInfo && "pageCount" in volInfo) {
              filteredResults.push(volInfo);
            }
          }
        }, function errorCallback(response) {
          console.log('Error Getting Data');
        });
    };

    return { makeUrl: makeUrl };
  })

  .controller('searchController', function($scope, searchFactory) {
    $scope.reqString = '';
    $scope.userReq = function() {
      if ($scope.text) {
        $scope.reqString = this.text;
        $scope.text = '';
      }
      searchFactory.makeUrl($scope.reqString);
    };
  });


// response.data.items
// response.data.items[0]
//   - volumeInfo
//     - .title
//     - .authors[0]
//     - .imagelinks.thumbnail
//     - .pagecount