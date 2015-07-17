'use strict';

angular.module('rumca-js')
  .factory('Keyboard', function(DSP) {

    var keys = new Array(256);    
    var activeKeys = [];

    //Keycodes to notes table
    //Lower row
    keys[90] = 31; // C2
    keys[83] = 32;
    keys[88] = 33;
    keys[68] = 34;
    keys[67] = 35;
    keys[86] = 36;
    keys[71] = 37;
    keys[66] = 38;
    keys[72] = 39;
    keys[78] = 40;
    keys[74] = 41;
    keys[77] = 42;
    keys[188] = 43;
    keys[76] = 44;
    keys[190] = 45;
    keys[186] = 46;
    keys[191] = 47;
    // Upper row
    keys[81] = 48;
    keys[50] = 49;
    keys[87] = 50;
    keys[51] = 51;
    keys[69] = 52;
    keys[52] = 53;
    keys[82] = 54;
    keys[84] = 55;
    keys[54] = 56;
    keys[89] = 57;
    keys[55] = 58;
    keys[85] = 59;
    keys[73] = 60;
    keys[57] = 61;
    keys[79] = 62;
    keys[48] = 63;
    keys[80] = 64;
    keys[189] = 65;
    keys[219] = 66;
    keys[187] = 67;

    return {
        activeKeys: activeKeys,
        keydown: function (keyCode) {
            activeKeys.push(keyCode);
            var note = this.frequencyFromNoteNumber(keyCode);
            if (note) {
                DSP.noteOn(note, keyCode);
            }
        },
        keyup: function (keyCode) {
            activeKeys.splice(activeKeys.indexOf(keyCode), 1);
            var note = this.frequencyFromNoteNumber(keyCode);
            if (note) {
                DSP.noteOff(note, keyCode);
            }
        },
        frequencyFromNoteNumber: function (keyCode) {
            var note = keys[keyCode];
            return 440 * Math.pow(2,(note-69)/12);
        }
    };
  });
