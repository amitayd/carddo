'use strict';

angular.module('frontendApp')
  .controller('ReviewCtrl', function ($scope) {
    $scope.flashCard = {
      sourceWord: 'cerca',
      destWord: 'close',
      associationImageUrl: 'http://files.abovetopsecret.com/files/img/hw50e1dbf7.jpg',
      associationText: 'it is in the close circle',
    };

  });
