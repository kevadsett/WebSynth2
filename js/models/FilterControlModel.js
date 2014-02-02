var FilterControlModel = Backbone.Model.extend({
    defaults: {
        x: 450,
        y: 60
    },
    initialize: function() {
        this.set({
            filterTypePot: new PotModel({
                x: this.get('x'),
                y: this.get('y'),
                radius: 18,
                steps: 8,
                startStep: 0,
                angleLimit: {
                    lo: 135,
                    hi: 45
                },
                values: {
                    lo: 0,
                    hi: 7
                },
                label: "Filter type"
            }),
            frequencyPot: new PotModel({
                x: this.get('x'),
                y: this.get('y') + 60,
                radius: 13,
                startValue: 350,
                angleLimit: {
                    lo: 135,
                    hi: 45
                },
                values: {
                    lo: 20,
                    hi: 20000
                },
                logarithmic: true,
                label: "frequency"
            }),
            qPot: new PotModel({
                x: this.get('x'),
                y: this.get('y') + 110,
                radius: 13,
                startValue: 1,
                angleLimit: {
                    lo: 135,
                    hi: 45
                },
                values: {
                    lo: 0.0001,
                    hi: 1000
                },
                logarithmic: true,
                label: "Q"
            }),
            gainPot: new PotModel({
                x: this.get('x'),
                y: this.get('y') + 160,
                radius: 13,
                startValue: 0,
                angleLimit: {
                    lo: 135,
                    hi: 45
                },
                values: {
                    lo: -40,
                    hi: 40
                },
                label: "Gain"
            }),
            activityLight: new ActivityLightModel({
                x: this.get('x'),
                y: this.get('y') - 50,
                radius: 5
            })
        });
        new FilterTypeView({model:this.get('filterTypePot')});
        this.listenTo(this.get('activityLight'), "change:active", this.onActiveChanged);
    },
    getType: function() {
        return this.get('filterTypePot').getValue();
    },
    getFrequency: function() {
        return this.get('frequencyPot').getValue();
    },
    getQ: function() {
        return this.get('qPot').getValue();
    },
    getGain: function() {
        return this.get('gainPot').getValue();
    },
    isActive: function() {
        return this.get('activityLight').getValue();
    },
    activate: function(active) {
        this.get('activityLight').set('active', active);
    },
    onActiveChanged: function() {
        var active = this.get('activityLight').getValue();
        this.get('filterTypePot').enable(active);
        this.get('frequencyPot').enable(active);
        this.get('qPot').enable(active);
        this.get('gainPot').enable(active);
    }
});