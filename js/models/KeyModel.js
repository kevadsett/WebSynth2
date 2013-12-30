var KeyModel = Backbone.Model.extend({
    defaults: {
        y: 0,
        pressed: false
    },
    initialize: function() {
        var noteName = NoteConverter.getNoteNameFromNumber(this.get('noteNumber'));
        this.set('isWhiteKey', !_.contains(noteName, '#'));
        this.set('noteName', noteName);
        if(this.get('isWhiteKey')) {
            this.set({
                width: WebSynthModel.BASE_NOTE_WIDTH,
                height: WebSynthModel.BASE_NOTE_HEIGHT
            });
        } else {
            this.set({
                width: WebSynthModel.BASE_NOTE_WIDTH * 0.6,
                height: WebSynthModel.BASE_NOTE_HEIGHT * 0.6
            });
        }
        new KeyView({model: this});
        
        switch (noteName.replace(/\d/, "")) {
            case "C":
            case "F":
                this.set('noteType', "left");
                break;
            case "D":
            case "G":
            case "A":
                this.set('noteType', "middle");
                break;
            case "E":
            case "B":
                this.set('noteType', "right");
                break;
        }
    }
});