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
    start: function(vcos, vcas, envelope, filter) {
        this.envelope = envelope;
        if(filter.isActive()) {
            this.filter = filter;
        }
        if(vcos.length !== vcas.length) {
            throw new Error("Number of oscillators differs from number of gains");
        }
        
        for(var i = 0; i < vcos.length; i++) {
            this.setupOsc(vcos[i], vcas[i]);
            vcos[i].start(0);
        }
    },
    
    setupOsc: function(vco, vca) {
        
        if(vco === undefined) {
            vco = WebAudioController.context.createOscillator();
        }
        if(vca === undefined) {
            vca = WebAudioController.context.createGain();
            vca.gain.value = 0;
        }
        
        var currentNoteNumber = NoteConverter.getNoteNumberFromFrequency(this.frequency);
        currentNoteNumber += vco.pitchModifier + (12 * vco.octaveModifier);
        vco.frequency.value = NoteConverter.getFrequencyFromNoteNumber(currentNoteNumber);
        vco.connect(vca);
        vca.gain.value = 0;
        vco.env = EnvelopeFactory.createEnvelope(vca.gain, {
            attack: this.envelope.getAttack(),
            decay: this.envelope.getDecay(),
            sustain: this.envelope.getSustain(),
            release: this.envelope.getRelease(),
            maximum: vca.maximum
        });
        if(this.filter) {
            var filter = WebAudioController.context.createBiquadFilter();
            filter.type = this.filter.getType();
            filter.frequency.value = this.filter.getFrequency();
            filter.Q.value = this.filter.getQ();
            filter.gain.value = this.filter.getGain();
            vca.connect(filter);
            filter.connect(WebAudioController.context.destination);
        } else {
            vca.connect(WebAudioController.context.destination);
        }
        vco.env.triggerOn();
        this.oscillators.push(vco);
    },
    
    stop: function() {
        _.each(this.oscillators, function(vco) {
            vco.env.triggerOff(function() {
                vco.stop();
                console.log("Stopping vco");
            });
        });
    }
}