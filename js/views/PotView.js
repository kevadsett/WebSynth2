var PotView = ControlView.extend({
    onTouchStart: function(coords) {
        if(this.withinBounds(coords) && !this.model.get('enabled')) {
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
        
        // label
        ctx.textAlign = "center";
        ctx.fillText(this.model.get('label'), 0, radius * 2);
        
        ctx.strokeStyle = this.model.get('enabled') ? "#000" : "#aaa";

        // notches
        var angleLimit = this.model.get('angleLimit');
        
        if(this.model.get('steps')) {
            var startAngle = this.model.get('startAngle');
            _.each(this.model.get('stepValues'), function(stepAngle, index) {
                var lineLength = 1.3;
                if(stepAngle === startAngle && startAngle !== angleLimit.lo) {
                    lineLength = 1.2;
                } else {
                    var isMiddleStep = (index < this.model.get('stepValues').length - 1) && index > 0;
                    if(isMiddleStep) {
                        lineLength = 1.1;
                    }
                }
                ctx.save();
                ctx.rotate(degToRad(stepAngle));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(radius * lineLength, 0);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }, this);
        } else {
            ctx.save();
            ctx.rotate(degToRad(angleLimit.lo));
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(radius * 1.3, 0);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            
            ctx.save();
            ctx.rotate(degToRad(angleLimit.hi));
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(radius * 1.3, 0);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
        
        // pot
        ctx.rotate(degToRad(this.model.get('angle')));
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.model.get('enabled') ? (this.model.get('touching') ? "#bbb" : "#aaa") : "#ddd";
        ctx.fill();
        ctx.moveTo(0, 0);
        ctx.lineTo(0 + radius, 0);
        ctx.stroke();
        ctx.closePath();
        
        ctx.restore();
    }
});