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
        }
    },
    onTouchEnd: function() {
        this.model.set('touching', false);
        this.stopListening(WebSynthEvents, "touchmove", this.onTouchMoved);
    },
    onTouchMoved: function(coords) {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            distX = coords.x - x,
            distY = coords.y - y,
            angle = Math.atan2(distY, distX);
        
        this.model.set('angle', radToDeg(angle));
        
    },
    withinBounds: function(coords) {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            radius = this.model.get('radius');
        return coords.x > x - radius && coords.x < x + radius && coords.y > y - radius && coords.y < y + radius;
    },
    render: function() {
        var ctx = this.context,
            centreX = this.model.get('x'),
            centreY = this.model.get('y'),
            radius = this.model.get('radius');
        ctx.save();
        ctx.translate(centreX, centreY);
        ctx.rotate(degToRad(this.model.get('angle')));
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.moveTo(0, 0);
        ctx.lineTo(0 + radius, 0);
        ctx.stroke();
        
        ctx.restore();
    }
});