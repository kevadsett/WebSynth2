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
        new FaderView({model: this});
    }
});