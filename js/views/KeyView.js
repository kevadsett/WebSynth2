var KeyView = Backbone.View.extend({
    initialize: function() {
        if(this.model.get('isWhiteKey')) {
            this.listenTo(WebSynthEvents, "renderWhiteKeys", this.setContext);
        } else {
            this.listenTo(WebSynthEvents, "renderBlackKeys", this.setContext);
        }
        this.listenTo(WebSynthEvents, "canvasClicked", this.onCanvasClicked);
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
    },
    onCanvasClicked: function(coords) {
        if(this.withinBounds(coords)) {
            console.log(this.model.get('noteName'));
        }
    },
    withinBounds: function(coords) {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            w = this.model.get('width'),
            h = this.model.get('height');
        if(this.model.get('isWhiteKey')) {
            if (coords.y > y + WebSynthModel.BASE_NOTE_HEIGHT * 0.6) {
                return coords.x > x && coords.x <= x + w && coords.y > y && coords.y <= y + h;
            } else {
                switch(this.model.get('noteType')) {
                    case "left":
                        return coords.x > x && coords.x <= x + w * 0.6 && coords.y > y && coords.y <= y + h;
                        break;
                    case "middle":
                        return coords.x > x + w * 0.4 && coords.x <= x + w * 0.6 && coords.y > y && coords.y <= y + h;
                        break;
                    case "right":
                        return coords.x > x + w * 0.4 && coords.x <= x + w && coords.y > y && coords.y <= y + h;
                        break;
                }
            }
        } else {
            return coords.x > x && coords.x <= x + w && coords.y > y && coords.y <= y + h;
        }
    }
});