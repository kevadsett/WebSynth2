var AdsrModel = Backbone.Model.extend({
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
                lo: 0.1,
                hi: 3,
                label: "A"
            }),
            decayFader: new FaderModel({
                x: this.get('x') + 40,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.8,
                lo: 0.1,
                hi: 3,
                label: "D"
            }),
            sustainFader: new FaderModel({
                x: this.get('x') + 70,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.7,
                lo:0,
                label: "S"
            }),
            releaseFader: new FaderModel({
                x: this.get('x') + 100,
                y: this.get('y') + this.get('height') + 15,
                height: 40,
                width: 15,
                value: 0.9,
                lo: 0.1,
                hi: 3,
                label: "R"
            })
        })
        new AdsrView({model:this});
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
        return 1 - this.get('releaseFader').getValue();
    },
    getNormalisedAttack: function() {
        var attackFader = this.get('attackFader');
        return normalise(attackFader.getValue(), attackFader.get('lo'), attackFader.get('hi'));
    },
    getNormalisedDecay: function() {
        var decayFader = this.get('decayFader');
        return normalise(decayFader.getValue(), decayFader.get('lo'), decayFader.get('hi'));
    },
    getNormalisedSustain: function() {
        var sustainFader = this.get('sustainFader');
        return normalise(sustainFader.getValue(), sustainFader.get('lo'), sustainFader.get('hi'));
    },
    getNormalisedRelease: function() {
        var releaseFader = this.get('releaseFader');
        return normalise(releaseFader.getValue(), releaseFader.get('lo'), releaseFader.get('hi'));
    }
});