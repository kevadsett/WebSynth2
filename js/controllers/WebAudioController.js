var WebAudioController = {
    init: function() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.context = new AudioContext();
        } catch(e) {
            alert("Web Audio API is not supported by your browser");
        }
    },
    Voice: function(frequency) {
        this.frequency = frequency;
        this.oscillators = [];
    }
}

WebAudioController.Voice.prototype = {
    start: function() {
        var vco = WebAudioController.context.createOscillator();
        vco.type = vco.SAWTOOTH;
        vco.frequency.value = this.frequency;
        
        var vca = WebAudioController.context.createGain();
        vca.gain.value = 0.3;
        
        vco.connect(vca);
        vca.connect(WebAudioController.context.destination);
        
        vco.start(0);
        this.oscillators.push(vco);
    },
    stop: function() {
        _.each(this.oscillators, function(osc) {
            osc.stop(0)
        });
    }
}