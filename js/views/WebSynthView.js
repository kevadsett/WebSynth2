var WebSynthView = Backbone.View.extend({
    el: ".canvasContainer",
    initialize: function() {
        this.$el.append('<canvas class="synthCanvas" width="800" height="600"></canvas>');
        this.context = this.$('.synthCanvas')[0].getContext('2d');
        WebSynthEvents.trigger('setupUserEvents');
        ResizeController.resizeCanvas();
        this.listenTo(WebSynthEvents, "render", this.render);
    },
    render: function() {
        this.context.clearRect(0, 0, this.model.get('width'), this.model.get('height'));
        WebSynthEvents.trigger('renderControls', this.context);
        WebSynthEvents.trigger('renderWhiteKeys', this.context);
        WebSynthEvents.trigger('renderBlackKeys', this.context);
    }
});