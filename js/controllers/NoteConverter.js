var NoteConverter = {
    getNoteNumberFromName: function(noteName) {
        var octaveNumber = parseInt(noteName.match(/\d+/g)),
            noteNum = _.indexOf(WebSynthModel.NOTE_NAMES, noteName.match(/[^\d+]/g).join(""));
        return noteNum + (12 * octaveNumber);
    },
    
    getNoteNameFromNumber: function(noteNumber) {
        var noteName = WebSynthModel.NOTE_NAMES[noteNumber % 12]
        noteName += Math.floor(noteNumber / 12);
        return noteName;
    },
    
    getFrequencyFromNoteName: function(noteName) {
        var freq = this.getFrequencyFromNoteNumber(this.getNoteNumberFromName(noteName));
        return freq;
    },
    
    getFrequencyFromNoteNumber: function(noteNumber) {
        return Math.pow(2, noteNumber/12) * WebSynthModel.BOTTOM_C_FREQ;
    },
};