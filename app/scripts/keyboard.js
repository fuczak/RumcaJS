'use strict';

angular.module('rumca-js')
  .factory('Keyboard', function(DSP) {
    var keys = new Array( 256 );
    //Keycodes to notes table
    //Lower row
    keys[16] = 41; // = F2
    keys[65] = 42;
    keys[90] = 43;
    keys[83] = 44;
    keys[88] = 45;
    keys[68] = 46;
    keys[67] = 47;
    keys[86] = 48; // = C3
    keys[71] = 49;
    keys[66] = 50;
    keys[72] = 51;
    keys[78] = 52;
    keys[77] = 53; // = F3
    keys[75] = 54;
    keys[188] = 55;
    keys[76] = 56;
    keys[190] = 57;
    keys[186] = 58;
    keys[191] = 59;
    // Upper row
    keys[81] = 60; // = C4 ("middle C")
    keys[50] = 61;
    keys[87] = 62;
    keys[51] = 63;
    keys[69] = 64;
    keys[82] = 65; // = F4
    keys[53] = 66;
    keys[84] = 67;
    keys[54] = 68;
    keys[89] = 69;
    keys[55] = 70;
    keys[85] = 71;
    keys[73] = 72; // = C5
    keys[57] = 73;
    keys[79] = 74;
    keys[48] = 75;
    keys[80] = 76;
    keys[219] = 77; // = F5
    keys[187] = 78;
    keys[221] = 79;
    keys[220] = 80;

    var activeKeys = [];

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
