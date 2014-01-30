var ControlView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(WebSynthEvents, "renderControls", this.setContext);
        this.listenTo(WebSynthEvents, "touchstart", this.onTouchStart);
        this.listenTo(WebSynthEvents, "touchend", this.onTouchEnd);
    },
    setContext: function(context) {
        this.context = context;
        this.render();
    },
    onTouchStart: function() {},
    onTouchEnd: function() {},
    render: function() {}
});