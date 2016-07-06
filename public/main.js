
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
    return { makeRequest: makeRequest};
  })

  .controller('searchController', function($scope, searchFactory) {
    $scope.initial = 'Book';
    $scope.media = ['Book', 'Movie', 'Musician'];
    console.log($scope.media);
    $scope.userReq = function() {
      var reqString = '';
      if ($scope.text) {
        reqString = this.text;
        $scope.text = '';
      }
      searchFactory.makeRequest(reqString, $scope);
    };
  });

 // http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=0584fe544d1fcd0f53fd65f03ef87ea0&format=json
 // Here are the details of your new API account.
 // Application name music Search
 // API key  0584fe544d1fcd0f53fd65f03ef87ea0
 // Shared secret  d003c6235bea1dac7e4584beb8ceb1ce
 // Registered to  NDGmss