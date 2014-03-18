var ControlView = Backbone.View.extend({
    initialize: function() {
        this.startListening();
        this.listenTo(WebSynthEvents, "renderControls", this.setContext);
        this.listenTo(this.model, "change:enabled", this.onEnabledChanged);
        window.CONTROL_VIEWS.push(this);
    },
    setContext: function(context) {
        this.context = context;
        this.render();
    },
    onTouchStart: function() {},
    onTouchEnd: function() {},
    render: function() {},
    startListening: function() {
        this.listenTo(WebSynthEvents, "touchstart", this.onTouchStart);
        this.listenTo(WebSynthEvents, "dblclick", this.onDoubleClick);
        this.listenTo(WebSynthEvents, "touchend", this.onTouchEnd);
    },
    onEnabledChanged: function() {
        if(this.model.get('enabled')) {
            this.startListening();
        } else {
            this.stopListening();
            this.listenTo(WebSynthEvents, "renderControls", this.setContext);
            this.listenTo(this.model, "change:enabled", this.onEnabledChanged);
        }
    }
});