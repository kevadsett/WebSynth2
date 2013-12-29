var KeyModel = Backbone.Model.extend({
    initialize: function() {
        var noteName = WebSynth.noteConverter.getNoteNameFromNumber(this.get('noteNumber'));
        this.set('isWhiteNote', !_.contains(noteName, '#'));
        this.set('noteName', noteName);
    }
});