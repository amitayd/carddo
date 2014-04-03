'use strict';

angular.module('frontendApp')
  .factory('backendService', ['$http', '$q', function ($http, $q) {
    // Service logic
    // ...

    var host = 'http://192.168.1.126/';

    var imageSearch = new google.search.ImageSearch();

    // Public API here
    return {
      getRandom: function () {
        var url = host + 'flashcard/random';
        return $http.get(url);
      },
      
      getImages: function getImagesPromise(word, cb) {
        var deferred = $q.defer();

        var searchComplete = function() {
          cb(imageSearch.results);
        };

        imageSearch.setSearchCompleteCallback(this, searchComplete, null);
        imageSearch.setResultSetSize(8);
        imageSearch.execute(word);



        return deferred.promise;

      }

    };
  }]);
