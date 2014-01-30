var PotModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        radius: 10,
        value: 0
    },
    initialize: function() {
        console.log("initializing pot model");
        new PotView({model: this});
        this.on('change:angle', _.bind(this.limitAngle, this));
        var values = this.get('values'),
            steps = this.get('steps');
        if(!values) {
            if(steps) {
                values = {
                    lo: 0,
                    hi: steps - 1
                };
            } else {
                values = {
                    lo: 0,
                    hi: 1
                }
            }
        }
        if(steps) this.calculateStepAngles();
        var startingAngle = 0;
        if (this.get('startAngle') !== undefined) {
            startingAngle = this.get('startAngle');
        } else if (this.get('startStep') !== undefined) {
            startingAngle = this.get('stepValues')[this.get('startStep')];
        }
        this.set({
            values: values,
            angle:  startingAngle
        })
    },
    
    calculateStepAngles: function() {
        var stepValues = [];
        this.eachStep(function(targetAngle) {
            stepValues.push(targetAngle);
        });
        this.set({
            stepValues: stepValues
        });
    },
    
    eachStep: function(callback) {
        var loLimit = this.get('angleLimit').lo,
            hiLimit = this.get('angleLimit').hi,
            steps = this.get('steps');
        
        if(loLimit > hiLimit) {
            hiLimit = hiLimit + 360;
        }
        var angleBetween = hiLimit - loLimit,
            singleStep = angleBetween / (steps - 1);
            
        for(var i = 0; i < steps; i++) {
            var targetAngle = (loLimit + (singleStep * i)) % 360;
            callback(targetAngle, i);
        }
    },
    
    limitAngle: function() {
        var angle = (this.get('angle') + 360) % 360,
            offsetAngle = this.getOffsetAngle(angle),
            loLimit = this.get('angleLimit').lo,
            hiLimit = this.get('angleLimit').hi,
            offsetHiLimit = this.getOffsetAngle(hiLimit),
            steps = this.get('steps'),
            values = this.get('values');
        
        if(steps === undefined) {
            if(offsetAngle > offsetHiLimit) {
                if(Math.abs(angle - loLimit) <= Math.abs(angle - hiLimit)) {
                    angle = loLimit;
                } else {
                    angle = hiLimit;
                }
            }
            this.set({
                'angle': angle,
                'value': mapValue(offsetAngle, 0, offsetHiLimit, values.lo, values.hi)
            });
        } else {
            var closestAngle, closeness = 360, angleIndex = -1;
            this.eachStep(function(targetAngle, index) {
                if (Math.abs(angle - targetAngle) < closeness) {
                    closeness = Math.abs(angle - targetAngle);
                    closestAngle = targetAngle;
                    angleIndex = index;
                }
            });
            angle = closestAngle;
            
            this.set({
                angle: angle,
                value: mapValue(angleIndex, 0, steps-1, values.lo, values.hi)
            });
        }
        console.log(this.cid, toDecimalPlaces(this.get('value'), 2));
    },
    getOffsetAngle: function(angle) {
        return (angle - this.get('angleLimit').lo + 360) % 360;
    },
    getValue: function() {
        return this.get('value');
    }
});