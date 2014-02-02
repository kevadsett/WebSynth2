var AdsrView = ControlView.extend({
    render: function() {
        var ctx = this.context,
            x = this.model.get('x'),
            y = this.model.get('y'),
            width = this.model.get('width'),
            height = this.model.get('height'),
            attack = this.model.getNormalisedAttack(),
            decay = this.model.getNormalisedDecay(),
            sustain = this.model.getNormalisedSustain(),
            release = this.model.getNormalisedRelease();
        if(attack > 1 || decay > 1 || sustain > 1 || release > 1) {
            console.log(attack, decay, sustain, release);
        }
        var a = {x: x, y: y + height},
            b = {x: mapValue(attack, 0, 1, x, x + width/4), y: y},
            c = {x: mapValue(decay, 0, 1, b.x, x + 2 * width/4), y: mapValue(sustain, 0, 1, y + height, y)},
            d = {x: mapValue(release, 1, 0, x + 3 * width/4, x + width), y: mapValue(sustain, 0, 1, y + height, y)},
            e = {x: x + width, y: y + height}
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(d.x, d.y);
        ctx.lineTo(e.x, e.y);
        
        ctx.fillStyle = "#999";
        ctx.strokeStyle = "#000";
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
});