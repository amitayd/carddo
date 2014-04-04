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
        getRandomCard: function () {
          console.log('getting random');
          var url = host + 'flashcard/random';
          return $http.get(url);
        },

        getTranslation: function (word) {
          console.log('getting translation');
          var url = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyAXMld2oSJ2qvi1pub8LAgC2-LCjd_VEis&target=en&source=es&dataType=jsonp&q=' + word + '&callback=JSON_CALLBACK'
          return $http.jsonp(url);
        },

        saveCard: function (flashCard) {
          var url = host + 'flashcard';
          return $http.post(url, flashCard);
        },

        getAllCards: function () {
          var url = host + 'flashcard/all';
          return $http.get(url);
        },

        getCardBySourceWord: function (sourceWord) {
          var url = host + 'flashcard/word/' + sourceWord;
          return $http.get(url);
        },

        getWordSuggestion: function(word) {
          console.log('get word suggestions', word);
          var url = host + 'suggest/' + word;
          return $http.get(url);

        },

        getImages: function getImagesPromise(word, cb) {

          var searchComplete = function () {
            cb(imageSearch.results);
          };

          imageSearch.setSearchCompleteCallback(this, searchComplete, null);
          // imageSearch.setRestriction(
          //   google.search.ImageSearch.RESTRICT_IMAGESIZE,
          //   google.search.ImageSearch.IMAGESIZE_SMALL);
          imageSearch.setResultSetSize(8);
          imageSearch.execute(word);
        }

      };
    }
  ]);