'use strict';

angular.module('rumca-js')
  .controller('GUI', function ($scope, $document, Keyboard, DSP) {

    //Reference Keyboard object in synth gui
    $scope.keyboard = Keyboard;
    //Reference DSP object in synth gui
    $scope.dsp = DSP;

    //Register keyboard event handlers
    $document.bind('keydown', function (e) {
      //Prevent invoking function multiple times when key is being hold down
      if (Keyboard.activeKeys.indexOf(e.keyCode) === -1) {
        //Using scope apply to enable ng-class statement on keyboard keys
        $scope.$apply(function() {
          Keyboard.keydown(e.keyCode);
        });
      }
    });
    $document.bind('keyup', function (e) {
      $scope.$apply(function() {
        Keyboard.keyup(e.keyCode);
      });
    });

    //Register watchers for not-straightforward connections between DSP and gui controls
    //New value automatically becomes callback argument
    $scope.$watch('dsp.osc1.type', DSP.setOsc1Type);
    $scope.$watch('dsp.osc2.type', DSP.setOsc2Type);
    $scope.$watch('dsp.osc1.octave', DSP.setOsc1Octave);
    $scope.$watch('dsp.osc2.octave', DSP.setOsc2Octave);
    $scope.$watch('dsp.osc1.detune.value', DSP.setOsc1Detune);
    $scope.$watch('dsp.osc2.detune.value', DSP.setOsc2Detune);
    $scope.$watch('dsp.oscMix', DSP.setOscMix);
    $scope.$watch('dsp.filter.type', DSP.setFilterType);
    $scope.$watch('dsp.filter.cutoff', DSP.setFilterFreq);
    $scope.$watch('dsp.filter.Q.value', DSP.setFilterQ);
    $scope.$watch('dsp.filterLFO.frequency.value', DSP.setFilterLFOFreq);
    $scope.$watch('dsp.filterLFOGain.gain.value', DSP.setFilterLFOGain);
    $scope.$watch('dsp.distortion.amount', DSP.distortion.updateCurve);
  });
