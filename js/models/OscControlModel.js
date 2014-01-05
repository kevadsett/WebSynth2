var OscControlModel = Backbone.Model.extend({
    defaults: {
        osc: WebAudioController.context.createOscillator(),
        x: 50,
        y: 50,
        
    },
    initialize: function() {
        console.log("Initializing osc control model");
        this.set('oscTypeSelector', new FaderModel({
            x: this.get('x'),
            y: this.get('y'),
            radius:10,
            steps:3,
            angleLimit: {
                lo: 140,
                hi: 40
            },
            angle: 270
        }));
    },
    getType: function() {
        return this.get('osc').type;
    },
    setType: function(value) {
        this.get('osc').type = value;
    }
});