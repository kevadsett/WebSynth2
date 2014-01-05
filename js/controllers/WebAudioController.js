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
    start: function(vco1, vco2) {
        this.setupOsc(vco1);
        this.setupOsc(vco2);
    },
    
    setupOsc: function(vco) {
        var vca = WebAudioController.context.createGain();
        
        if(vco) {
            vca.gain.value = 0.3;
        } else {
            vco = WebAudioController.context.createOscillator();
            vca.gain.value = 0;
        }
        vco.frequency.value = this.frequency;
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