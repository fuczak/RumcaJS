'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {
  	var ctx = new $window.AudioContext();
  	var voices = [];

    return {
    	ctx: ctx,
    	noteOn: function(note) {
    		if (voices[note] == null) {
    			//Create new voice and store it in voices array
    			voices[note] = new Voice(note, ctx);
    		}
    	},
    	noteOff: function(note) {
    		if (voices[note] != null) {
    			voices[note].noteOff();
    			voices[note] = null;
    		}
    	}
    };
  });
