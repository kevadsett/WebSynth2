var PotModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        radius: 10,
        value: 0,
        enabled: true
    },
    initialize: function() {
        new PotView({model: this});
        this.on('change:angle', _.bind(this.limitAngle, this));
        var values = this.get('values'),
            steps = this.get('steps'),
            startAngle = this.get('startAngle'),
            startStep = this.get('startStep'),
            startValue = this.get('startValue');

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
        
        if(this.get('logarithmic')) {
            values.lo = Math.log(values.lo);
            values.hi = Math.log(values.hi);
            if(startValue !== undefined) {
                startValue = Math.log(startValue);
            }
        }

        if(steps) this.calculateStepAngles();

        var startingAngle = 0;
        if (startAngle !== undefined) {
            startingAngle = startAngle;
        } else if (startStep !== undefined) {
            startingAngle = this.get('stepValues')[startStep];
        } else if(startValue !== undefined) {
            var angleLimit = this.get('angleLimit');
            startingAngle = mapValue(startValue, values.lo, values.hi, angleLimit.lo, angleLimit.hi + 360);
        }

        this.set({
            values: values,
            angle:  startingAngle
        });
        this.limitAngle();
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
    },
    getOffsetAngle: function(angle) {
        return (angle - this.get('angleLimit').lo + 360) % 360;
    },
    getValue: function() {
        return this.get('logarithmic') ? Math.exp(this.get('value')): this.get('value');
    },
    enable: function(value) {
        this.set('enabled', value);
    }
});