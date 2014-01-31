var ActivityLightView = ControlView.extend({
    onTouchStart: function(coords) {
        if(this.withinBounds(coords)) {
            this.model.set('touching', true);
            this.listenTo(WebSynthEvents, "touchend", this.onTouchEnd);
            this.listenTo(WebSynthEvents, "touchmove", this.onTouchMoved);
            this.toggleActive();
        }
    },
    toggleActive: function() {
        var isActive = this.model.get('active');
        this.model.set('active', !isActive);
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

        // pot
        ctx.rotate(degToRad(this.model.get('angle')));
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.model.get('active') ? "#00ff00" : "#333";
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
});