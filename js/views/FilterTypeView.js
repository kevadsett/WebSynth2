var FilterTypeView = ControlView.extend({
    render: function() {
        var width = this.model.get('radius') * 1.3,
            height = this.model.get('radius') * 0.7,
            x = this.model.get('x') - width / 2,
            y = this.model.get('y') - height * 3,
            ctx = this.context;
        ctx.strokeStyle = this.model.get('enabled') ? "#fff" : "#aaa";
        this.drawBackground(x, y, width, height, ctx);

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        switch(this.model.getValue()) {
            case FilterTypes.LO_PASS:
                this.drawLowPassIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.HI_PASS:
                this.drawHighPassIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.BAND_PASS:
                this.drawBandPassIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.LO_SHELF:
                this.drawLowShelfIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.HI_SHELF:
                this.drawHighShelfIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.PEAKING:
                this.drawPeakingIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.NOTCH:
                this.drawNotchIcon(x, y, width, height, ctx);
            break;
            case FilterTypes.ALL_PASS:
                this.drawAllPassIcon(x, y, width, height, ctx);
            break;
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    },
    drawBackground: function(x, y, width, height, ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#333";
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    },
    drawLowPassIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height/2);
        ctx.lineTo(width - width/5, height/2);
        ctx.lineTo(width, height);
    },
    drawHighPassIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height);
        ctx.lineTo(width/5, height/2);
        ctx.lineTo(width, height/2);
    },
    drawBandPassIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height);
        ctx.lineTo(width/5, height);
        ctx.lineTo(width/5 * 2, height/2);
        ctx.lineTo(width - width/5 * 2, height/2);
        ctx.lineTo(width - width/5 , height);
        ctx.lineTo(width, height);
    },
    drawLowShelfIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height - height/5);
        ctx.lineTo(width/5, height - height/5);
        ctx.lineTo(width/5 * 2, height/2);
        ctx.lineTo(width, height/2);
    },
    drawHighShelfIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height/2);
        ctx.lineTo(width - width/5 * 2, height/2);
        ctx.lineTo(width - width/5, height - height/5);
        ctx.lineTo(width, height - height/5);
    },
    drawPeakingIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height/2);
        ctx.lineTo(width/9 * 3, height/2);
        ctx.lineTo(width/9 * 4, height/5);
        ctx.lineTo(width - width/9 * 4, height/5);
        ctx.lineTo(width - width/9 * 3 , height/2);
        ctx.lineTo(width, height/2);
    },
    drawNotchIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height/2);
        ctx.lineTo(width/5, height/2);
        ctx.lineTo(width/5 * 2, height);
        ctx.lineTo(width - width/5 * 2, height);
        ctx.lineTo(width - width/5 , height/2);
        ctx.lineTo(width, height/2);
    },
    drawAllPassIcon: function(x, y, width, height, ctx) {
        ctx.moveTo(0, height/2);
        ctx.lineTo(width, height/2);

        ctx.textAlign = "center";
        ctx.fillText("All pass", width/2, -6);
    }
})