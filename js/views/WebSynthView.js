var WebSynthView = Backbone.View.extend({
    el: "body",
    initialize: function() {
        this.$el.append('<canvas id="synthCanvas" width="800" height="600"></canvas>');
        this.context = this.$('#synthCanvas')[0].getContext('2d');
        WebSynthEvents.trigger('setupClickEvents');
        this.listenTo(WebSynthEvents, "render", this.render);
    },
    render: function() {
        WebSynthEvents.trigger('renderWhiteKeys', this.context);
        WebSynthEvents.trigger('renderBlackKeys', this.context);
    }
});