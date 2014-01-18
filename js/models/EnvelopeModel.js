var EnvelopeModel = Backbone.Model.extend({
    defaults: {
        attack: 2,
        decay: 1,
        sustain: 0.5,
        release: 0.1,
        maximum: 1
    },
    initialize: function() {
        this.set({
            phase: EnvelopeModel.ATTACK,
            sustain: this.get('sustain') * this.get('maximum')
        });
        console.log("Sustain value: " + this.get('sustain'));
    },
    connect: function(param) {
        this.set('param', param);
    },
    triggerOn: function() {
        var param = this.get('param');
//        var now = WebAudioController.context.currentTime;
        var now = new Date().getTime();
        WebSynthEvents.on("render", this.update, this);
        this.set({
            startTime: now,
            currentValue: 0
        });
    },
    update: function() {
        var now = new Date().getTime(),
            deltaTime = (now - this.get('startTime')),
            currentValue = this.get('currentValue'),
            attackTime = this.get('attack'),
            decayTime = this.get('decay'),
            sustainValue = this.get('sustain'),
            releaseTime = this.get('release'),
            maxValue = this.get('maximum')
        
        switch(this.get('phase')) {
            case EnvelopeModel.ATTACK:
                if(currentValue < this.get('maximum')) {
                    currentValue += this.getValueChange(attackTime, maxValue, deltaTime);
                } else {
                    currentValue = this.get('maximum');
                    this.set('phase', EnvelopeModel.DECAY);
                }
                break;
            case EnvelopeModel.DECAY:
                if(currentValue > this.get('sustain')) {
                    currentValue -= this.getValueChange(decayTime, maxValue - sustainValue, deltaTime);
                } else {
                    currentValue = this.get('sustain');
                    this.set('phase', EnvelopeModel.SUSTAIN);
                }
                break;
            case EnvelopeModel.RELEASE: 
                if(currentValue > 0) {
                    currentValue -= this.getValueChange(releaseTime, sustainValue, deltaTime);
                } else {
                    currentValue = 0;
                    WebSynthEvents.off("render", this.update, this);
                    this.get('callback')();
                }
                break;
        }
        
        this.get('param').value = currentValue;
        this.set({
            startTime: now,
            currentValue: currentValue
        });
    },
    getValueChange: function(totalTime, totalChange, deltaTime) {
        // note totalTime is expected in seconds
        return totalChange * deltaTime / (totalTime * 1000);
    },
    triggerOff: function(callback) {
        var param = this.get('param');
        var now = WebAudioController.context.currentTime;
        this.set({
            phase: EnvelopeModel.RELEASE,
            callback: callback,
            sustain: this.get('currentValue')
        });
    }
},{
    ATTACK: 0,
    DECAY: 1,
    SUSTAIN: 2,
    RELEASE: 3
});