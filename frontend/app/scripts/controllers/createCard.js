'use strict';

angular.module('frontendApp')
  .controller('CreateCard', ['backendService', '$scope',
    function (backendService, $scope) {
      $scope.flashCard = {
        sourceWord: 'cerca',
        destWord: 'close',
        associationImageUrl: 'http://files.abovetopsecret.com/files/img/hw50e1dbf7.jpg',
        associationText: 'it is in the close circle',
      };

      //$scope.images = [1,2,3];
      //
      $scope.imageToSearch = 'bla';

      $scope.searchImages = function () {
        console.log('searching image', $scope.imageToSearch);
        backendService.getImages($scope.imageToSearch, function (results) {
          $scope.images = results;
          $scope.$apply('images');
          console.log(results);
        });
      };

      $scope.setImage = function (url) {
        console.log('set image', url);
        $scope.flashCard.associationImageUrl = url;
      };

      $scope.saveCard = function () {
        console.log('save card', $scope.flashCard);
        backendService.saveCard($scope.flashCard);
      };

      var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
        };
      })();

      $scope.getTranslation = function () {
        delay(function () {

          console.log('get translation', $scope.flashCard.sourceWord);
          backendService.getTranslation($scope.flashCard.sourceWord).then(function (result) {
            var translation = result.data.data.translations[0].translatedText;
            $scope.flashCard.destWord = translation;
            $scope.imageToSearch = translation;
            $scope.searchImages();
            console.log(result);
          });
        }, 500);


      };
    }
  ]);