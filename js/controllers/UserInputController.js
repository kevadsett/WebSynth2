UserInputController = {
    touches: [],
    init: function() {
        WebSynthEvents.on('setupUserEvents', function(){
            $('.synthCanvas').on('mousedown', UserInputController.onMouseDown);
            $('.synthCanvas').on('mouseup', UserInputController.onMouseUp);
            $(document).on('keydown', UserInputController.onKeyDown);
            $(document).on('keyup', UserInputController.onKeyUp);
        });
    },
    onMouseDown: function(event) {
        event.preventDefault();
        var $target = $(event.target),
            x = event.pageX - $target.offset().left,
            y = event.pageY - $target.offset().top;
        WebSynthEvents.trigger('touchstart', {x: x, y: y});
//        console.log(x, y);
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
    },
    onKeyDown: function(event) {
        var keyNumber = getKeyboardNumber(event.which, WebSynth);
        if(keyNumber !== -1) WebSynthEvents.trigger('keydown', keyNumber, event.shiftKey);
    },
    onKeyUp: function(event) {
        var keyNumber = getKeyboardNumber(event.which, WebSynth);
        if(keyNumber !== -1) WebSynthEvents.trigger('keyup', keyNumber, event.shiftKey);
    }
}