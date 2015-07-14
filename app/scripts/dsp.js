'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {
  	var ctx = new $window.AudioContext();
  	var voices = [];

    //init filter
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 7.0;
    filter.cutoff = 14;
    filter.frequency.value = Math.pow(2, filter.cutoff);
    filter.connect(ctx.destination);
    //filter LFO mod gain
    var filterLFOGain = ctx.createGain();
    filterLFOGain.gain.value = 500;
    filterLFOGain.connect(filter.frequency);
    //filter LFO mod frequency
    var filterLFO = ctx.createOscillator();
    filterLFO.frequency.value = 4;
    filterLFO.connect(filterLFOGain);
    filterLFO.start();

    //init osc1 gain
    var osc1Gain = ctx.createGain();
    osc1Gain.connect(filter);

    //inti osc2 gain
    var osc2Gain = ctx.createGain();
    osc2Gain.connect(filter);

    return {
    	ctx: ctx,
      osc1: {
        type: 'sawtooth',
        octave: 0
      },
      osc2: {
        type: 'sawtooth',
        octave: 0
      },
      filter: filter,
      filterLFO: filterLFO,
      filterLFOGain: filterLFOGain,
      osc1Gain: osc1Gain,
      osc2Gain: osc2Gain,
    	noteOn: function(note, keyCode) {
    		if (!voices[keyCode]) {
    			//Create new voice and store it in voices array
    			voices[keyCode] = new Voice(note, this);
    		}
    	},
    	noteOff: function(note, keyCode) {
    		if (voices[keyCode]) {
    			voices[keyCode].noteOff();
    			voices[keyCode] = null;
    		}
    	},
      setOsc1Type: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc1Type(value);
          }
        });
      },
      setOsc1Octave: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc1Octave(value);
          }
        });
      },
      setOsc2Octave: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc2Octave(value);
          }
        });
      },
      setOsc2Type: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc2Type(value);
          }
        });
      },
      filterCutoffUpdate: function (value) {
        filter.frequency.value = Math.pow(2, value);
      }
    };
  });
