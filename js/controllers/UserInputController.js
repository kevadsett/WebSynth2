WebSynthEvents.on('setupClickEvents', function(){
    $('#synthCanvas').on('click', function(event) {
        WebSynthEvents.trigger('canvasClicked', {x: event.pageX, y: event.pageY});
    });
});