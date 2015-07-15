'use strict';

angular.module('rumca-js')
  .factory('Voice', function () {

    var Voice = function (note, dsp) {

      var now = dsp.ctx.currentTime;

      //Create Filter
      this.filter = dsp.ctx.createBiquadFilter();
      this.filter.type = dsp.filter.type;
      this.filter.Q.value = dsp.filter.Q.value;
      this.filter.frequency.value = Math.pow(2, dsp.filter.cutoff);
      this.filter.connect(dsp.oscGain);

      //Create Filter LFO
      this.filterLFOGain = dsp.ctx.createGain();
      this.filterLFOGain.gain.value = dsp.filterLFOGain.gain.value;
      this.filterLFOGain.connect(this.filter.frequency);
      this.filterLFO = dsp.ctx.createOscillator();
      this.filterLFO.frequency.value = dsp.filterLFO.frequency.value;
      this.filterLFO.connect(this.filterLFOGain);
      this.filterLFO.start(now);

      //create volume envelope
      this.volEnv = dsp.ctx.createGain();
      this.volEnv.gain.cancelScheduledValues(now);
      this.volEnv.gain.setValueAtTime(0, now);
      this.volEnv.gain.linearRampToValueAtTime(1, now + Number(dsp.volEnv.attack));
      this.volEnv.gain.setTargetAtTime(Number(dsp.volEnv.sustain), now, Number(dsp.volEnv.decay) + 0.001);
      this.volEnv.connect(this.filter);

      //create oscillator 1
      this.osc1 = dsp.ctx.createOscillator();
      this.note = note;
      this.osc1.frequency.value = note * Math.pow(2, dsp.osc1.octave);
      this.osc1.detune.value = dsp.osc1.detune.value;
      this.osc1.type = dsp.osc1.type;
      this.osc1.connect(this.volEnv);
      this.osc1.start();

      //create oscillator 2
      this.osc2 = dsp.ctx.createOscillator();
      this.note = note;
      this.osc2.frequency.value = note;
      this.osc2.type = dsp.osc2.type;
      this.osc2.connect(this.volEnv);
      this.osc2.start();

    };

    Voice.prototype.noteOff = function(dsp) {
      var now = dsp.ctx.currentTime;
      var release = now + Number(dsp.volEnv.release);
      this.volEnv.gain.cancelScheduledValues(now);
      this.volEnv.gain.setValueAtTime(this.volEnv.gain.value, now);
      this.volEnv.gain.setTargetAtTime(0, now, Number(dsp.volEnv.release)/10);
    	this.osc1.stop(release);
      this.osc2.stop(release);
    };

    Voice.prototype.setOsc1Type = function (value) {
      this.osc1.type = value;
    };

    Voice.prototype.setOsc2Type = function (value) {
      this.osc2.type = value;
    };

    Voice.prototype.setOsc1Octave = function (value) {
      this.osc1.frequency.value = this.note * Math.pow(2, value);
    };

    Voice.prototype.setOsc2Octave = function (value) {
      this.osc2.frequency.value = this.note * Math.pow(2, value);
    };

    Voice.prototype.setOsc1Detune = function (value) {
      this.osc1.detune.value = value;
    };

    Voice.prototype.setOsc2Detune = function (value) {
      this.osc2.detune.value = value;
    };

    Voice.prototype.setFilterType = function (value) {
      this.filter.type = value;
    };

    Voice.prototype.setFilterFreq = function (value) {
      console.log(value);
      this.filter.frequency.value = Math.pow(2, value);
    };

    Voice.prototype.setFilterQ = function (value) {
      this.filter.Q.value = value;
    };

    Voice.prototype.setFilterLFOFreq = function (value) {
      this.filterLFO.frequency.value = value;
    };

    Voice.prototype.setFilterLFOGain = function (value) {
      this.filterLFOGain.gain.value = value;
    };

    return Voice;
  });
