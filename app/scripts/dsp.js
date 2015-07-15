'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {
  	var ctx = new $window.AudioContext();
  	var voices = [];

    //init patch for Volume Envelope
    var volEnv = {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.7,
      release: 2
    };

    //Init patch for Filter Envelope
    var filterEnv = {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.7,
      release: 2
    };

    //Init patch for Filter
    var filter = {
      type: 'lowpass',
      Q: {
        value: 7
      },
      cutoff: 14
    };

    var filterLFOGain = {
      gain: {
        value: 0
      }
    };

    var filterLFO = {
      frequency: {
        value: 0
      }
    };

    var osc1 = {
      type: 'sawtooth',
      octave: 0,
      detune: {
        value: 0
      }
    };

    var osc2 = {
      type: 'triangle',
      octave: 1,
      detune: {
        value: 0
      }
    };

    //init osc1 gain
    var oscGain = ctx.createGain();
    oscGain.gain.value = 0.1;
    oscGain.connect(ctx.destination);

    function updateVoices(fn, value) {
        voices.forEach(function (voice) {
          fn.call(voice, value);
        });
    };

    return {
    	ctx: ctx,
      osc1: osc1,
      osc2: osc2,
      volEnv: volEnv,
      filter: filter,
      filterLFO: filterLFO,
      filterLFOGain: filterLFOGain,
      filterEnv: filterEnv,
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
        // updateVoices(setOsc1Type, value);
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
      setFilterType: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setFilterType(value);
          }
        });
      },
      setFilterCutoff: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setFilterFreq(value);
          }
        });
      },
      setFilterQ: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setFilterQ(value);
          }
        });
      },
      setFilterLFOFreq: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setFilterLFOFreq(value);
          }
        });
      },
      setFilterLFOGain: function (value) {
        voices.forEach(function (voice) {
          if (voice) {
            voice.setFilterLFOGain(value)
          }
        });
      }
    };
  });
