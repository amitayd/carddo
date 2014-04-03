'use strict';

angular.module('frontendApp')
  .controller('ReviewCtrl', ['backendService', '$scope',
    function (backendService, $scope) {
      backendService.getRandom().then(function (result) {
        console.log('random result', result);
        $scope.flashCard = result.data;
        // $scope.flashCard = {
        //   sourceWord: 'cerca',
        //   destWord: 'close',
        //   associationImageUrl: 'http://files.abovetopsecret.com/files/img/hw50e1dbf7.jpg',
        //   associationText: 'it is in the close circle',
        // };

      });


    }
  ]);