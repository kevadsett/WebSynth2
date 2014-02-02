var ActivityLightModel = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        radius: 10,
        active: false
    },
    initialize: function() {
        new ActivityLightView({model: this});
    },
    getValue: function() {
        return this.get('active');
    }
});