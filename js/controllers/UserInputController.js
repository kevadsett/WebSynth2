UserInputController = {
    touches: [],
    init: function() {
        WebSynthEvents.on('setupUserEvents', function(){
            $('.synthCanvas').on('mousedown', UserInputController.onMouseDown);
            $('.synthCanvas').on('mouseup', UserInputController.onMouseUp);
        });
    },
    onMouseDown: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('touchstart', {x: x, y: y});
        $('.synthCanvas').on('mousemove', UserInputController.onMouseMove);
    },
    onMouseMove: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('touchmove', {x: x, y: y});
    },
    onMouseUp: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('touchend', {x: x, y: y});
        $('.synthCanvas').off('mousemove');
    }
}