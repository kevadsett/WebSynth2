WebSynthEvents.on('setupClickEvents', function(){
    $('#synthCanvas').on('mousedown', function(event) {
        WebSynthEvents.trigger('mousedown', {x: event.pageX, y: event.pageY});
        $('#synthCanvas').on('mousemove', function(event) {
            WebSynthEvents.trigger('mousedrag', {x: event.pageX, y: event.pageY});
        });
    });
    $('#synthCanvas').on('mouseup', function(event) {
        WebSynthEvents.trigger('mouseup', {x: event.pageX, y: event.pageY});
        $('#synthCanvas').off('mousemove');
    });
});