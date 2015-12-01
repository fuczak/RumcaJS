'use strict';

angular.module('rumca-js')
  .factory('Delay', function (Tuna) {
    return new Tuna.Delay({
      feedback: 0.45,    //0 to 1+
      delayTime: 800,    //how many milliseconds should the wet signal be delayed?
      wetLevel: 0.8,    //0 to 1+
      dryLevel: 1,       //0 to 1+
      cutoff: 22050,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
      bypass: 0
    });
  });
