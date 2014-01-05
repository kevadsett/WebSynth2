var FaderModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        radius: 10,
    },
    initialize: function() {
        console.log("initializing fader model");
        new FaderView({model: this});
        this.on('change:angle', _.bind(this.limitAngle, this));
    },
    limitAngle: function() {
        var angle = (this.get('angle') + 360) % 360,
            loLimit = this.get('angleLimit').lo,
            hiLimit = this.get('angleLimit').hi,
            steps = this.get('steps');
        
        if(loLimit > hiLimit) {
            hiLimit = hiLimit + 360;
        }
        console.log("lo: " + loLimit, "hi: " + hiLimit);
        if(steps !== undefined) {
            var angleBetween = hiLimit - loLimit,
                singleStep = angleBetween / (steps - 1);
            var closestAngle, closeness = 360, angleIndex = -1;
            for(var i = 0; i < steps; i++) {
                var targetAngle = (loLimit + (singleStep * i)) % 360;
                if (Math.abs(angle - targetAngle) < closeness) {
                    closeness = Math.abs(angle - targetAngle);
                    closestAngle = targetAngle;
                    angleIndex = i;
                }
            }
            angle = closestAngle;
        }
        
        this.set({
            'angle': angle,
            'value': angleIndex
        });
        console.log(this.get('value'));
    }
});