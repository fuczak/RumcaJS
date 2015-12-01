'use strict';

angular.module('rumca-js')
  .factory('Ctx', function ($window) {
    var AudioContext = $window.AudioContext || $window.webkitAudioContext;
    return new AudioContext();
  });
