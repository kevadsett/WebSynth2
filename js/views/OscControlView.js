var OscControlView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(WebSynthEvents, "renderControls", this.setContext);
    },
    setContext: function(context) {
        this.context = context;
        this.render();
    },
    render: function() {
        var typeSelector = this.model.get('typeSelector'),
            x = typeSelector.get('x'),
            y = typeSelector.get('y'),
            radius = typeSelector.get('radius');
        drawSineIcon(this.context, x - radius * 2, y + radius, radius);
        drawSquareIcon(this.context, x - radius * 2, y - radius, radius);
        drawSawIcon(this.context, x + radius , y - radius, radius);
        drawTriIcon(this.context, x + radius , y + radius, radius);
    }
})