'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {
  	var ctx = new $window.AudioContext();
  	var voices = [];

    var volEnv = {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.7,
      release: 2
    };

    //init filter
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 7.0;
    filter.cutoff = 14;
    filter.frequency.value = Math.pow(2, filter.cutoff);
    filter.connect(ctx.destination);
    //filter LFO mod gain
    var filterLFOGain = ctx.createGain();
    filterLFOGain.gain.value = 0;
    filterLFOGain.connect(filter.frequency);
    //filter LFO mod frequency
    var filterLFO = ctx.createOscillator();
    filterLFO.frequency.value = 0;
    filterLFO.connect(filterLFOGain);
    filterLFO.start();

    //init osc1 gain
    var oscGain = ctx.createGain();
    oscGain.gain.value = 0.1;
    oscGain.connect(filter);

    return {
    	ctx: ctx,
      osc1: {
        type: 'sawtooth',
        octave: 0,
        detune: {
          value: 0
        }
      },
      osc2: {
        type: 'sawtooth',
        octave: 0,
        detune: {
          value: 0
        }
      },
      volEnv: volEnv,
      filter: filter,
      filterLFO: filterLFO,
      filterLFOGain: filterLFOGain,
      oscGain: oscGain,
    	noteOn: function(note, keyCode) {
    		if (!voices[keyCode]) {
    			//Create new voice and store it in voices array
    			voices[keyCode] = new Voice(note, this);
    		}
    	},
    	noteOff: function(note, keyCode) {
    		if (voices[keyCode]) {
    			voices[keyCode].noteOff(this);
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
      setOsc2Type: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc2Type(value);
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
      setOsc1Detune: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc1Detune(value);
          }
        });
      },
      setOsc2Detune: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOsc2Detune(value);
          }
        });
      },
      filterCutoffUpdate: function (value) {
        filter.frequency.value = Math.pow(1.95, value);
      }
    };
  });
