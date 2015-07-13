'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window) {
    return {
      ctx: new $window.AudioContext()
    }
  });
