var EnvelopeFactory = {
    createEnvelope: function(param, settings) {
        var env = new EnvelopeModel(settings);
        env.connect(param);
        return env;
    }
}