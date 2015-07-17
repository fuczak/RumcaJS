'use strict';

angular.module('rumca-js')
  .factory('DSP', function ($window, Voice) {

  	var ctx = new $window.AudioContext();
  	var voices = [];

    //Master Effect Chain
    //Master volume
    var master = ctx.createGain();
    master.connect(ctx.destination);
    master.gain.value = 0.05;

    //Distortion
    var distortion = ctx.createWaveShaper();
    distortion.connect(master);

    //Curve code: http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
    distortion.makeDistCurve = function(amount) {
      var k = typeof amount === 'number' ? amount : 50,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          deg = Math.PI / 180,
          i = 0,
          x;
      for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
      }
      return curve;
    };

    distortion.updateCurve = function (value) {
      //Do not route through the distortion node if amount is set to 0
      if (value === 0) {
        voiceChain.connect(master);
      } else {
        voiceChain.connect(distortion);
        distortion.curve = distortion.makeDistCurve(Number(value));
      }
    };

    distortion.amount = 0;
    distortion.oversample = '4x';

    //Voice Chain Volume
    var voiceChain = ctx.createGain();
    voiceChain.gain.value = 0.8;
    voiceChain.connect(distortion);
    //Needs to be called after defining voiceChain node
    distortion.updateCurve(distortion.amount);

    //Init Patch
    //Volume Envelope
    var volEnv = {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.7,
      release: 2
    };

    //Filter Envelope
    var filterEnv = {
      attack: 0.1,
      decay: 0.6,
      sustain: 0.7,
      release: 2
    };

    //Filter
    var filter = {
      type: 'lowpass',
      Q: {
        value: 7
      },
      cutoff: 9,
      modEnv: 50
    };

    //Filter LFO
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

    //Oscillators
    var osc1 = {
      type: 'sawtooth',
      octave: 0,
      detune: {
        value: 0
      }
    };

    var osc2 = {
      type: 'triangle',
      octave: -1,
      detune: {
        value: 0
      }
    };

    var oscMix = 50;

    function updateVoices(fn, value) {
      voices.forEach(function (voice) {
        if (voice) {            
          voice[fn](value);
        }
      });
    }

    return {
    	ctx: ctx,
      osc1: osc1,
      osc2: osc2,
      oscMix: oscMix,
      volEnv: volEnv,
      filter: filter,
      filterLFO: filterLFO,
      filterLFOGain: filterLFOGain,
      filterEnv: filterEnv,
      voiceChain: voiceChain,
      master: master,
      distortion: distortion,
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
        updateVoices('setOsc1Type', value);
      },
      setOsc1Octave: function (value) {
        updateVoices('setOsc1Octave', value);
      },
      setOsc2Type: function (value) {
        updateVoices('setOsc2Type', value);
      },
      setOsc2Octave: function (value) {
        updateVoices('setOsc2Octave', value);
      },
      setOsc1Detune: function (value) {
        updateVoices('setOsc1Detune', value);
      },
      setOsc2Detune: function (value) {
        updateVoices('setOsc2Detune', value);
      },
      setOscMix: function (value) {
        updateVoices('setOscMix', value);
      },
      setFilterType: function (value) {
        updateVoices('setFilterType', value);
      },
      setFilterFreq: function (value) {
        updateVoices('setFilterFreq', value);
      },
      setFilterQ: function (value) {
        updateVoices('setFilterQ', value);
      },
      setFilterLFOFreq: function (value) {
        updateVoices('setFilterLFOFreq', value);
      },
      setFilterLFOGain: function (value) {
        updateVoices('setFilterLFOGain', value);
      }
    };
  });
