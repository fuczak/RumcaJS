'use strict';

angular.module('rumca-js')
  .controller('GUI', function ($scope, $document, Keyboard, DSP) {
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
    //Reference DSP object in synth gui
    $scope.dsp = DSP;
    //Register watchers for not-straightforward connections between DSP and gui controls
    $scope.$watch('dsp.osc1.type', function (value) {
      DSP.setOsc1Type(value);
    });

    $scope.$watch('dsp.osc2.type', function (value) {
      DSP.setOsc2Type(value);
    });

    $scope.$watch('dsp.osc1.octave', function (value) {
      DSP.setOsc1Octave(value);
    });

    $scope.$watch('dsp.osc2.octave', function (value) {
      DSP.setOsc2Octave(value);
    });

    $scope.$watch('dsp.filter.cutoff', function (value) {
      DSP.filterCutoffUpdate(value);
    });

  });
