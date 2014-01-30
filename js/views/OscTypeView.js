var OscTypeView = ControlView.extend({
    render: function() {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            radius = this.model.get('radius');
        this.drawSineIcon(x - radius * 2, y + radius);
        this.drawSquareIcon(x - radius * 2, y - radius);
        this.drawSawIcon(x + radius , y - radius);
        this.drawTriIcon(x + radius , y + radius);
    },
    
    drawSineIcon: function(x, y) {
        var ctx = this.context,
            size = this.model.get('radius'),
            increment = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for(var i = 0; i < 2 * Math.PI; i+= increment) {
            ctx.lineTo(x + i * size / (Math.PI / increment), y + (size / (Math.PI / increment /3) * Math.sin(i)));
        }
        ctx.stroke();
        ctx.closePath();
    },
    
    drawSquareIcon: function(x, y) {
        var ctx = this.context,
            size = this.model.get('radius');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size/2);
        ctx.lineTo(x + size/2, y + size/2);
        ctx.lineTo(x + size/2, y - size/2);
        ctx.lineTo(x + size, y - size/2);
        ctx.lineTo(x + size, y);
        ctx.stroke();
        ctx.closePath();
    },
    
    drawSawIcon: function(x, y) {
        var ctx = this.context,
            size = this.model.get('radius');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size/2, y + size/2);
        ctx.lineTo(x + size/2, y - size/2);
        ctx.lineTo(x + size, y);
        ctx.stroke();
        ctx.closePath();
    },
    
    drawTriIcon: function(x, y) {
        var ctx = this.context,
            size = this.model.get('radius');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size/4, y + size/2);
        ctx.lineTo(x + 3 * size/4, y - size/2);
        ctx.lineTo(x + size, y);
        ctx.stroke();
        ctx.closePath();
    }
})