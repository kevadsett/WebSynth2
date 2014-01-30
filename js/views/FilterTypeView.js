var FilterTypeView = ControlView.extend({
    render: function() {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            radius = this.model.get('radius');
    }
})