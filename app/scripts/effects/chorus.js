'use strict';

angular.module('rumca-js')
  .factory('Chorus', function (Tuna) {

    var Chorus = new Tuna.Chorus({
      rate: 8,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 0
    });

    return Chorus;
  });
