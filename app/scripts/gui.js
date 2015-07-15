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

    $scope.$watch('dsp.osc1.detune.value', function (value) {
      DSP.setOsc1Detune(value);
    });

    $scope.$watch('dsp.osc2.detune.value', function (value) {
      DSP.setOsc2Detune(value);
    });

    $scope.$watch('dsp.filter.type', function (value) {
      DSP.setFilterType(value);
    });

    $scope.$watch('dsp.filter.cutoff', function (value) {
      DSP.setFilterCutoff(value);
    });

    $scope.$watch('dsp.filter.Q.value', function (value) {
      DSP.setFilterQ(value);
    });

    $scope.$watch('dsp.filterLFO.frequency.value', function (value) {
      DSP.setFilterLFOFreq(value);
    });
    //
    $scope.$watch('dsp.filterLFOGain.gain.value', function (value) {
      DSP.setFilterLFOGain(value);
    });

  });
