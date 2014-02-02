var FaderModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        width: 20,
        height: 50,
        value: 0,
        lo: 0,
        hi: 1,
        enabled: true
    },
    initialize: function() {
        this.set({
            padding: this.get('height')/10
        });
        new FaderView({model: this});
    },
    //convenience!
    getValue: function() {
        return toDecimalPlaces(this.get('value'), 1);
    },
    getNormalisedValue: function() {
        return normalise(this.get('value'), this.get('lo'), this.get('hi'));
    },
    enable: function(value) {
        this.set('enabled', value);
    }
});