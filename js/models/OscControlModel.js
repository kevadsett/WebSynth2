var OscControlModel = Backbone.Model.extend({
    defaults: {
        x: 100,
        y: 50
    },
    initialize: function() {
        console.log("Initializing osc control model");
        this.set({
            oscTypePot: new PotModel({
                x: this.get('x'),
                y: this.get('y'),
                radius:25,
                steps:4,
                angleLimit: {
                    lo: 140,
                    hi: 40
                },
                startStep: 2,
                label: "Wave type"
            }),
            volumeFader: new FaderModel({
                x: this.get('x') + 75,
                y: this.get('y') - 25,
                value: 1,
                label: "amplitude"
            }),
            octavePot: new PotModel({
                x: this.get('x') + 150,
                y: this.get('y'),
                radius: 15,
                steps:5,
                angleLimit: {
                    lo: 135, 
                    hi: 45
                },
                startAngle: 270,
                values: {
                    lo:-2,
                    hi:2
                },
                label: "Octave"
            }),
            pitchPot: new PotModel({
                x: this.get('x') + 200,
                y: this.get('y'),
                radius: 15,
                steps:25,
                angleLimit: {
                    lo: 135, 
                    hi: 45
                },
                startAngle: 270,
                values: {
                    lo:-12,
                    hi:12
                },
                label: "Pitch"
            }),
            detunePot: new PotModel({
                x: this.get('x') + 250,
                y: this.get('y'),
                radius: 15,
                angleLimit: {
                    lo: 135, 
                    hi: 45
                },
                startAngle: 270,
                values: {
                    lo:-100,
                    hi:100
                },
                label: "Detune"
            }),
            activityLight: new ActivityLightModel({
                x: this.get('x') - 60,
                y: this.get('y'),
                radius: 5
            })
        });
        new OscTypeView({model:this.get('oscTypePot')});
        this.listenTo(this.get('activityLight'), "change:active", this.onActiveChanged);
    },
    getType: function() {
        return this.get('oscTypePot').getValue();
    },
    getVolume: function() {
        return this.get('volumeFader').getValue();
    },
    getOctaveOffset: function() {
        return this.get('octavePot').getValue();
    },
    getPitchOffset: function() {
        return this.get('pitchPot').getValue();
    },
    getDetune: function() {
        return this.get('detunePot').getValue();
    },
    isActive: function() {
        return this.get('activityLight').getValue();
    },
    activate: function(active) {
        console.log("Activate");
        this.get('activityLight').set('active', active);
    },
    onActiveChanged: function() {
        var active = this.get('activityLight').getValue();
        console.log(active);
        this.get('oscTypePot').enable(active);
        this.get('volumeFader').enable(active);
        this.get('octavePot').enable(active);
        this.get('pitchPot').enable(active);
        this.get('detunePot').enable(active);
    }
});