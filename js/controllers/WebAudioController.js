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
    start: function(vco1, vca1, vco2, vca2) {
        this.setupOsc(vco1, vca1);
        this.setupOsc(vco2, vca2);
    },
    
    setupOsc: function(vco, vca) {
        
        if(vco === undefined) {
            vco = WebAudioController.context.createOscillator();
        }
        if(vca === undefined) {
            vca = WebAudioController.context.createGain();
            vca.gain.value = 0;
        }
        vco.frequency.value = this.frequency;
        vco.connect(vca);
        vca.connect(WebAudioController.context.destination);
        
        vco.start(0);
        console.log("vco:", vco.type);
        console.log("vca:", vca.gain.value);
        this.oscillators.push(vco);
    },
    
    stop: function() {
        _.each(this.oscillators, function(osc) {
            osc.stop(0)
        });
    }
}