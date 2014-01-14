var FaderModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        width: 20,
        height: 50,
        value: 0
    },
    initialize: function() {
        console.log("initializing fader model");
        this.set({
            padding: this.get('height')/10
        });
        new FaderView({model: this});
    },
    //convenience!
    getValue: function() {
        return this.get('value');
    }
});