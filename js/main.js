WebSynth.NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
WebSynth.BOTTOM_C_FREQ = 8.1757989156; // hertz
//WebSynth.WebAudio = new WebAudioController();
WebSynth.noteConverter = new NoteConverter();
var bottomNote = WebSynth.noteConverter.getNoteNumberFromName("C3");
var topNote = WebSynth.noteConverter.getNoteNumberFromName("B6");
var keys = [];
for(var i = bottomNote; i < topNote; i++) {
    var key = new KeyModel({noteNumber: i});
    keys.push(key);
}
WebSynth.keyboard = new Keyboard(keys);