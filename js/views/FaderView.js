var FaderView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(WebSynthEvents, "renderControls", this.setContext);
        this.listenTo(WebSynthEvents, "touchstart", this.onTouchStart);
    },
    setContext: function(context) {
        this.context = context;
        this.render();
    },
    onTouchStart: function(coords) {
        if(this.withinBounds(coords)) {
            this.model.set('touching', true);
            this.listenTo(WebSynthEvents, "touchend", this.onTouchEnd);
            this.listenTo(WebSynthEvents, "touchmove", this.onTouchMoved);
            this.onTouchMoved(coords);
        }
    },
    onTouchEnd: function() {
        this.model.set('touching', false);
        this.stopListening(WebSynthEvents, "touchmove", this.onTouchMoved);
    },
    onTouchMoved: function(coords) {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            lo = this.model.get('lo'),
            hi = this.model.get('hi'),
            value = mapValue(coords.y, y + this.model.get('height'), y, lo, hi);
        value = Math.min(value, hi);
        value = Math.max(value, lo);
        this.model.set('value', value);
        console.log(this.model.cid, this.model.getNormalisedValue());
    },
    withinBounds: function(coords) {
        var left = this.model.get('x'),
            top = this.model.get('y'),
            right = left + this.model.get('width'),
            bottom = top + this.model.get('height'),
            valueY = bottom - (this.model.getNormalisedValue() * this.model.get('height')),
            padding = this.model.get('padding');
        
        var withinSliderBounds = (coords.x > left 
                 && coords.x < right
                 && coords.y > top 
                 && coords.y < bottom);
        var withinSwitchBounds = (coords.x > left - padding 
                && coords.x < right + padding
                && coords.y > valueY - padding
                && coords.y < valueY + padding);
        
        return withinSliderBounds || withinSwitchBounds;
    },
    render: function() {
        var ctx = this.context,
            x = this.model.get('x'),
            y = this.model.get('y'),
            width = this.model.get('width'),
            height = this.model.get('height'),
            valueY = height - (this.model.getNormalisedValue() * height);
        ctx.save();
        ctx.translate(x, y);
        // label
        ctx.textAlign = "center";
        ctx.fillText(this.model.get('label'), width/2, height + height/3);
        if(this.model.get('touching')) {
            var text = "" + toDecimalPlaces(this.model.getValue(), 1),
                textWidth = ctx.measureText(text).width,
                textPadding = textWidth / 10;
            ctx.fillStyle="#ddd";
            ctx.fillRect(-width/2 - textWidth - textPadding, valueY - 8, textWidth + (textPadding * 2), 12);
            ctx.fillStyle = "#000";
            ctx.textAlign = "right";
            ctx.fillText(text, -width/2, valueY);
        }
        
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        var padding = this.model.get('padding');
        ctx.rect(-padding, valueY - padding, width + padding * 2, padding * 2);
        ctx.moveTo(padding, valueY);
        ctx.lineTo(width - padding, valueY);
        ctx.fillStyle = this.model.get('touching') ? "#bbb" : "#aaa";
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
});