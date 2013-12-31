var KeyView = Backbone.View.extend({
    initialize: function() {
        if(this.model.get('isWhiteKey')) {
            this.listenTo(WebSynthEvents, "renderWhiteKeys", this.setContext);
        } else {
            this.listenTo(WebSynthEvents, "renderBlackKeys", this.setContext);
        }
        this.listenTo(WebSynthEvents, "mousedown", this.onMouseDown);
        this.listenTo(WebSynthEvents, "mouseup", this.onMouseUp);
        this.listenTo(WebSynthEvents, "mousedrag", this.onMouseDragged);
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
        var fillStyle;
        if(this.model.get('isWhiteKey')) {
            if(this.model.get('pressed')) {
                fillStyle = "#ccc";
            } else {
                fillStyle = "#eee";
            }
        } else {
            if(this.model.get('pressed')) {
                fillStyle = "#333";
            } else {
                fillStyle = "#444";
            }
        }
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
    },
    onMouseDown: function(coords) {
        if(this.withinBounds(coords)) {
            this.pressKey();
        }
    },
    onMouseUp: function(coords) {
        if(this.model.get('pressed')) {
            this.releaseKey();
        }
    },
    onMouseDragged: function(coords) {
        if(this.withinBounds(coords)) {
            if(!this.model.get('pressed')) {
                this.pressKey();
            }
        } else {
            if(this.model.get('pressed')) {
                this.releaseKey();
            }
        }
    },
    pressKey: function() {
        WebSynthEvents.trigger('keyPressed', this.model.get('noteName'));
        this.model.set('pressed', true);
    },
    releaseKey: function() {
        WebSynthEvents.trigger('keyReleased', this.model.get('noteName'));
        this.model.set('pressed', false);
    },
    withinBounds: function(coords) {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            w = this.model.get('width'),
            h = this.model.get('height');
        if(this.model.get('isWhiteKey')) {
            if (coords.y > y + WebSynthModel.baseNoteHeight * 0.6) {
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