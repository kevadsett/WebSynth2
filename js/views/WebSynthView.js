var WebSynthView = Backbone.View.extend({
    el: "body",
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.append('<canvas id="synthCanvas" width="800" height="600"></canvas>');
        var canvas = this.$('#synthCanvas')[0];
        WebSynthEvents.trigger('renderWhiteKeys', canvas.getContext('2d'));
        WebSynthEvents.trigger('renderBlackKeys', canvas.getContext('2d'));
        WebSynthEvents.trigger('setupClickEvents');
        
    }
});