var WebSynthModel = Backbone.Model.extend({
    defaults: {
        topNote: "C5",
        bottomNote: "C3",
        keyboard: new KeyCollection(),
        whiteKeys: new KeyCollection(),
        blackKeys: new KeyCollection(),
        x: 40,
        y: 40,
        pressedKeys: [],
        oscControlOne: new OscControlModel(),
        oscControlTwo: new OscControlModel({y:200})
    },
    initialize: function() {
        this.createKeys();
        new WebSynthView({model: this});
        this.listenTo(WebSynthEvents, "keyPressed", this.onKeyPressed);
        this.listenTo(WebSynthEvents, "keyReleased", this.onKeyReleased);
        this.listenTo(WebSynthEvents, "resize", this.onResize);
    },
    createKeys: function() {
        var bottomNote = NoteConverter.getNoteNumberFromName(this.get('bottomNote')),
            topNote = NoteConverter.getNoteNumberFromName(this.get('topNote'));
        this.set('numberOfKeys', topNote - bottomNote);
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
    
    onResize: function(newCanvasSize) {
        var w = newCanvasSize.width,
            h = newCanvasSize.height;
        WebSynthModel.padding = w / 40
        WebSynthModel.baseNoteHeight = h / 4.8;
        WebSynthModel.baseNoteWidth = (w - (WebSynthModel.padding * 2)) / this.get('whiteKeys').length;
        this.set({
            x: 0 + WebSynthModel.padding,
            y: h - WebSynthModel.baseNoteHeight - WebSynthModel.padding,
            width: w,
            height: h
        });
        this.positionWhiteKeys();
        this.positionBlackKeys();
    },
    
    positionWhiteKeys: function() {
        this.get('whiteKeys').each(_.bind(function(key, index) {
            key.set({
                x: this.get('x') + index * WebSynthModel.baseNoteWidth,
                y: this.get('y'),
                width: WebSynthModel.baseNoteWidth,
                height: WebSynthModel.baseNoteHeight
            });
        }, this));
    },
    
    positionBlackKeys: function() {
        var blackKeyOffset = WebSynthModel.baseNoteWidth * 0.7;
        this.get('blackKeys').each(_.bind(function(key, index) {
            key.set({
                x: this.get('x') + blackKeyOffset + index * WebSynthModel.baseNoteWidth,
                y: this.get('y'),
                width: WebSynthModel.baseNoteWidth * 0.6,
                height: WebSynthModel.baseNoteHeight * 0.6
            });
            var noteName = key.get('noteName').replace(/\d/, "");
            switch(noteName) {
                    case "A#":
                    case "D#":
                        blackKeyOffset += WebSynthModel.baseNoteWidth;
                        key.set('x', key.get('x') + WebSynthModel.baseNoteWidth * 0.1);
                        break;
                    case "C#":
                    case "F#":
                        key.set('x', key.get('x') - WebSynthModel.baseNoteWidth * 0.1);
                        break;
                    case "G#":
                    break;
            }
        }, this));
    }
},{
    NOTE_NAMES: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    BOTTOM_C_FREQ: 8.1757989156, // hertz
});