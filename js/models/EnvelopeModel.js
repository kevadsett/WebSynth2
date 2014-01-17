var EnvelopeModel = Backbone.Model.extend({
    defaults: {
        x: 42,
        y: 300,
        width: 130,
        height: 50
    },
    initialize: function() {
        console.log("Initializing envelope model");
        this.set({
            attackFader: new FaderModel({
                x: this.get('x') + 10,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.15,
                label: "A"
            }),
            decayFader: new FaderModel({
                x: this.get('x') + 40,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.8,
                label: "D"
            }),
            sustainFader: new FaderModel({
                x: this.get('x') + 70,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.7,
                label: "S"
            }),
            releaseFader: new FaderModel({
                x: this.get('x') + 100,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.9,
                label: "R"
            })
        })
        new EnvelopeView({model:this});
    },
    getAttack: function() {
        return this.get('attackFader').getValue();
    },
    getDecay: function() {
        return this.get('decayFader').getValue();
    },
    getSustain: function() {
        return this.get('sustainFader').getValue();
    },
    getRelease: function() {
        return this.get('releaseFader').getValue();
    }
});