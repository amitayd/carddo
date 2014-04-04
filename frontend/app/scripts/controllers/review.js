'use strict';

angular.module('frontendApp')
  .controller('ReviewCtrl', ['backendService', '$scope',
    function (backendService, $scope) {
      backendService.getAllCards().then(function (result) {
        console.log('random result', result);
        $scope.flashCards = result.data;
        $scope.index = 0;
        if (result.data.length) {
          $scope.flashCard = result.data[$scope.index];
        }
        // $scope.flashCard = {
        //   sourceWord: 'cerca',
        //   destWord: 'close',
        //   associationImageUrl: 'http://files.abovetopsecret.com/files/img/hw50e1dbf7.jpg',
        //   associationText: 'it is in the close circle',
        // };


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

      });


    }
  ]);