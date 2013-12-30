var WebAudioController = {
    init: function() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.context = new AudioContext();
            console.log("Web Audio ready");
        } catch(e) {
            alert("Web Audio API is not supported by your browser");
        }
    }
}