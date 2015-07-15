'use strict';

angular.module('rumca-js')
  .factory('Voice', function () {

    var Voice = function (note, dsp) {

      //create volume envelope
      var now = dsp.ctx.currentTime;
      this.volEnv = dsp.ctx.createGain();
      this.volEnv.gain.cancelScheduledValues(now);
      this.volEnv.gain.setValueAtTime(0, now);
      this.volEnv.gain.linearRampToValueAtTime(1, now + Number(dsp.volEnv.attack));
      this.volEnv.gain.setTargetAtTime(Number(dsp.volEnv.sustain), now, Number(dsp.volEnv.decay) + 0.001);
      this.volEnv.connect(dsp.oscGain);

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

    return Voice;
  });
