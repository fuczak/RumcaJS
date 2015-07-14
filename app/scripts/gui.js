'use strict';

angular.module('rumca-js')
  .controller('GUI', function ($scope, $document, Keyboard) {
    //Register keyboard event handlers
    $document.bind('keydown', function (e) {
      //Prevent invoking function multiple times when key is being hold down
      if (Keyboard.activeKeys.indexOf(e.keyCode) === -1) {
        Keyboard.keydown(e.keyCode);
      }
    });
    $document.bind('keyup', function (e) {
      Keyboard.keyup(e.keyCode);
    });
  });
