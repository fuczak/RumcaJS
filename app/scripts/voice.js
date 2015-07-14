'use strict';

angular.module('rumca-js')
  .factory('Voice', function () {

    var Voice = function (note, ctx) {   
      this.osc = ctx.createOscillator();
      this.osc.frequency.value = note;
      this.osc.connect(ctx.destination);
      this.osc.start();
    };

    Voice.prototype.noteOff = function() {
    	this.osc.stop();
    };

    return Voice;
  });
