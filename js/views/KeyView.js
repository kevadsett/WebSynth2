var KeyView = Backbone.View.extend({
    initialize: function() {
        if(this.model.get('isWhiteKey')) {
            this.listenTo(WebSynthEvents, "renderWhiteKeys", this.setContext);
        } else {
            this.listenTo(WebSynthEvents, "renderBlackKeys", this.setContext);
        }
        this.listenTo(WebSynthEvents, "keydown", this.onKeydown);
        this.listenTo(WebSynthEvents, "keyup", this.onKeyup);
        this.listenTo(WebSynthEvents, "touchstart", this.onTouchStart);
        this.listenTo(WebSynthEvents, "touchend", this.onTouchEnd);
        this.listenTo(WebSynthEvents, "touchmove", this.onTouchMoved);
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
    onKeydown: function(keyNumber) {
        if(keyNumber === this.model.get('noteNumber') && !this.model.get('pressed')) {
            this.pressKey();
        }
    },
    onKeyup: function(keyNumber, shiftKey) {
        console.log(shiftKey);
        if(this.model.get('pressed') && 
           (keyNumber === this.model.get('noteNumber') ||
            (shiftKey && keyNumber === this.model.get('noteNumber') + 12) ||
            (!shiftKey && keyNumber === this.model.get('noteNumber') - 12))
          ){
            this.releaseKey();
        }
    },
    onTouchStart: function(coords) {
        if(this.withinBounds(coords)) {
            this.pressKey();
        }
    },
    onTouchEnd: function(coords) {
        if(this.withinBounds(coords)) {
            if(this.model.get('pressed')) {
            console.log("touchend within bounds of pressed key: " + this.model.get('noteName'));
                this.releaseKey();
            }
        }
    },
    onTouchMoved: function(coords) {
        if(!this.withinBounds(coords)) {
            if(this.model.get('pressed')) {
                this.releaseKey();
            }
        } else {
            if(!this.model.get('pressed')) {
                this.pressKey();
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
                        return coords.x > x + w * 0.2 && coords.x <= x + w * 0.8 && coords.y > y && coords.y <= y + h;
                        break;
                    case "midLeft":
                        return coords.x > x + w * 0.2 && coords.x <= x + w * 0.7 && coords.y > y && coords.y <= y + h;
                        break;
                    case "midRight":
                        return coords.x > x + w * 0.3 && coords.x <= x + w * 0.8 && coords.y > y && coords.y <= y + h;
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