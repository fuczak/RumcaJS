'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {
  	var ctx = new $window.AudioContext();
  	var voices = [];

    return {
    	ctx: ctx,
      osc: {
        type: 'sine'
      },
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
