var KeyView = Backbone.View.extend({
    initialize: function() {
        if(this.model.get('isWhiteKey')) {
            this.listenTo(WebSynthEvents, "renderWhiteKeys", this.setContext);
        } else {
            this.listenTo(WebSynthEvents, "renderBlackKeys", this.setContext);
        }
    },
    setContext: function(context) {
        this.context = context;
        this.render();
    },
    render: function() {
        var ctx = this.context,
            x = this.model.get('x'),
            y = this.model.get('y'),
            w = this.model.get('width'),
            h = this.model.get('height');
        ctx.fillStyle = (this.model.get('isWhiteKey')) ? "#eee" : "#222";
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
    }
});