var OscControlModel = Backbone.Model.extend({
    defaults: {
        x: 100,
        y: 50,
        
    },
    initialize: function() {
        console.log("Initializing osc control model");
        this.set('oscTypeSelector', new FaderModel({
            x: this.get('x'),
            y: this.get('y'),
            radius:25,
            steps:4,
            angleLimit: {
                lo: 140,
                hi: 40
            },
            angle: 140
        }));
        new OscControlView({model:this});
    },
    getType: function() {
        return this.get('oscTypeSelector').get('value');
    }
});