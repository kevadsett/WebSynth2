var OscControlModel = Backbone.Model.extend({
    defaults: {
        x: 100,
        y: 50,
        
    },
    initialize: function() {
        console.log("Initializing osc control model");
        this.set({
            typeSelector: new PotModel({
                x: this.get('x'),
                y: this.get('y'),
                radius:25,
                steps:4,
                angleLimit: {
                    lo: 140,
                    hi: 40
                },
                angle: 140
            }),
            volumeFader: new FaderModel({
                x: this.get('x') + 75,
                y: this.get('y') - 25,
                value: 1
            }),
            detunePot: new PotModel({
                x: this.get('x') + 150,
                y: this.get('y'),
                radius: 15,
                angleLimit: {
                    lo: 135, 
                    hi: 45
                },
                angle: 270,
                values: {
                    lo:-100,
                    hi:100
                }
            })
        });
        new OscControlView({model:this});
    },
    getType: function() {
        return this.get('typeSelector').get('value');
    }
});