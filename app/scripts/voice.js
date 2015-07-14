'use strict';

angular.module('rumca-js')
  .factory('Voice', function () {

    var Voice = function (note, dsp) {
      this.osc = dsp.ctx.createOscillator();
      this.osc.frequency.value = note;
      this.osc.connect(dsp.ctx.destination);
      this.osc.type = dsp.osc.type;
      this.osc.start();
    };

    Voice.prototype.noteOff = function() {
    	this.osc.stop();
    };

    Voice.prototype.setOscType = function (value) {
      this.osc.type = value;
    };

    return Voice;
  });
