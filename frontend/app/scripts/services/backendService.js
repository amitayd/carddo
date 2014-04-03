'use strict';

angular.module('frontendApp')
  .factory('backendService', ['$http', '$q',
    function ($http, $q) {
      // Service logic
      // ...

      var host = 'http://localhost:8088/';

      var imageSearch = new google.search.ImageSearch();

      // Public API here
      return {
        getRandom: function () {
          console.log('getting random');
          var url = host + 'flashcard/random';
          return $http.get(url);
        },

        saveCard: function (flashCard) {
          var url = host + 'flashcard/random';
          return $http.post(url, flashCard);
        },

        getImages: function getImagesPromise(word, cb) {
          var deferred = $q.defer();

          var searchComplete = function () {
            cb(imageSearch.results);
          };

          imageSearch.setSearchCompleteCallback(this, searchComplete, null);
          imageSearch.setResultSetSize(8);
          imageSearch.execute(word);



          return deferred.promise;

        }

      };
    }
  ]);