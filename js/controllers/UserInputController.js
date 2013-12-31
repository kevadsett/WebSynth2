UserInputController = {
    init: function() {
        WebSynthEvents.on('setupClickEvents', function(){
            $('.synthCanvas').on('mousedown', UserInputController.onClick);
            $('.synthCanvas').on('mouseup', UserInputController.onRelease);
        });
    },
    onClick: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('mousedown', {x: x, y: y});
        $('.synthCanvas').on('mousemove', UserInputController.onDrag);
    },
    onDrag: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('mousedrag', {x: x, y: y});
    },
    onRelease: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('mouseup', {x: x, y: y});
        $('.synthCanvas').off('mousemove');
    }
}