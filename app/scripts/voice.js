'use strict';

angular.module('rumca-js')
  .factory('Voice', function (DSP) {
    var ctx = DSP.ctx;

    var Voice = function (frequency) {
      //todo
      console.log(frequency + ': ' + ctx);
    };

    return Voice;
  });
