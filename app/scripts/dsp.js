'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {
  	var ctx = new $window.AudioContext();
  	var voices = [];

    //init filter
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 7.0;
    filter.frequency.value = 22050;
    filter.connect(ctx.destination);

    //init osc1 gain
    var osc1Gain = ctx.createGain();
    osc1Gain.connect(filter);

    //inti osc2 gain
    var osc2Gain = ctx.createGain();
    osc2Gain.connect(filter);

    return {
    	ctx: ctx,
      osc1: {
        type: 'sine'
      },
      osc2: {
        type: 'sine'
      },
      filter: filter,
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
      oscTypeUpdate: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setOscType(value);
          }
        });
      }
    };
  });
