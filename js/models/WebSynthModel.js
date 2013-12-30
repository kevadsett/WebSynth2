var WebSynthModel = Backbone.Model.extend({
    defaults: {
        topNote: "B6",
        bottomNote: "C3",
        keyboard: new KeyCollection(),
        whiteKeys: new KeyCollection(),
        blackKeys: new KeyCollection(),
        x: 40,
        y: 40,
        pressedKeys: []
    },
    initialize: function() {
        this.createKeys();
        new WebSynthView();
        this.listenTo(WebSynthEvents, "keyPressed", this.onKeyPressed);
        this.listenTo(WebSynthEvents, "keyReleased", this.onKeyReleased);
    },
    createKeys: function() {
        var bottomNote = NoteConverter.getNoteNumberFromName(this.get('bottomNote')),
            topNote = NoteConverter.getNoteNumberFromName(this.get('topNote'));
        for(var i = bottomNote; i <= topNote; i++) {
            var keyModel = new KeyModel({
                noteNumber: i
            });
            this.get('keyboard').add(keyModel);
            if(_.contains(NoteConverter.getNoteNameFromNumber(i), "#")) {
                this.get('blackKeys').add(keyModel);
            } else {
                this.get('whiteKeys').add(keyModel);
            }
        }
        this.positionWhiteKeys();
        this.positionBlackKeys();
    },
    
    onKeyPressed: function(key) {
        var frequency = NoteConverter.getFrequencyFromNoteName(key);
        var voice = new WebAudioController.Voice(frequency);
        this.get('pressedKeys').push(voice);
        voice.start();
    },
    
    onKeyReleased: function(key) {
        var pressedKeys = this.get('pressedKeys');
        var voice = _.filter(pressedKeys, function(pressedKey) {
            return pressedKey.frequency === NoteConverter.getFrequencyFromNoteName(key);
        })[0];
        var voiceIndex = _.indexOf(pressedKeys, voice);
        pressedKeys.splice(voiceIndex, 1);
        voice.stop();
        this.set('pressedKeys', pressedKeys);
    },
    
    positionWhiteKeys: function() {
        this.get('whiteKeys').each(_.bind(function(key, index) {
            key.set({
                x: this.get('x') + index * WebSynthModel.BASE_NOTE_WIDTH,
                y: this.get('y')
            });
        }, this));
    },
    
    positionBlackKeys: function() {
        var blackKeyOffset = WebSynthModel.BASE_NOTE_WIDTH * 0.7;
        this.get('blackKeys').each(_.bind(function(key, index) {
            key.set({
                x: this.get('x') + blackKeyOffset + index * WebSynthModel.BASE_NOTE_WIDTH,
                y: this.get('y')
            });
            var noteName = key.get('noteName').replace(/\d/, "");
            switch(noteName) {
                    case "A#":
                    case "D#":
                        blackKeyOffset += WebSynthModel.BASE_NOTE_WIDTH;
                        key.set('x', key.get('x') + WebSynthModel.BASE_NOTE_WIDTH * 0.1);
                        break;
                    case "C#":
                    case "F#":
                        key.set('x', key.get('x') - WebSynthModel.BASE_NOTE_WIDTH * 0.1);
                        break;
                    case "G#":
                    break;
            }
        }, this));
    }
},{
    NOTE_NAMES: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    BOTTOM_C_FREQ: 8.1757989156, // hertz
    BASE_NOTE_WIDTH: 25,
    BASE_NOTE_HEIGHT: 125
});