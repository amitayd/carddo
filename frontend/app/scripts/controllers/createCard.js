'use strict';

angular.module('frontendApp')
  .controller('CreateCard', ['backendService', '$scope', '$routeParams',
    function (backendService, $scope, $routeParams) {
      console.log('routeParams', $routeParams);

      backendService.getAllCards().then(function (result) {
        $scope.flashCards = result.data;


        $scope.index = 0;
        if ($routeParams.sourceWord) {
          for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].sourceWord === $routeParams.sourceWord) {
              $scope.index = i;
              console.log('foundIndex', i);
            }
          }
        }

        if (result.data.length) {
          $scope.flashCard = result.data[$scope.index];
        }

        //$scope.images = [1,2,3];
        //
        $scope.imageToSearch = '';

        $scope.searchImages = function () {
          console.log('searching image', $scope.imageToSearch);
          backendService.getImages($scope.imageToSearch, function (results) {
            $scope.images = results;
            window.setTimeout(function () {
              $scope.$apply('images');
            }, 0);
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
          if ($scope.flashCard.isNew === true) {
            $scope.flashCard.isNew = false;
            $scope.flashCards.push($scope.flashCard);
            changeCard($scope.flashCards.length - 1);
          }
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
          }, 800);
        };

        var changeCard = function (index) {
          console.log(index);
          $scope.index = index;
          $scope.flashCard = result.data[index];
        };

        $scope.back = function () {
          var index = Math.max(0, $scope.index - 1);
          changeCard(index);
        };

        $scope.forward = function () {
          var index = Math.min($scope.flashCards.length - 1, $scope.index + 1);
          changeCard(index);
        };

        $scope.newCard = function () {
          console.log('new card');
          $scope.flashCard = {
            sourceWord: '',
            destWord: '',
            associationImageUrl: '',
            associationText: '',
            isNew: true
          };
        };
      });

    }
  ]);