'use strict';

angular.module('rumca-js')
  .factory('Delay', function (Tuna) {

    var Delay = new Tuna.Delay({
      feedback: 0.45,
      delayTime: 100,
      wetLevel: 0.8,
      dryLevel: 1,
      cutoff: 22050,
      bypass: 0
    });

    return Delay;
  });
