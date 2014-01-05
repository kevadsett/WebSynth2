var ResizeController = {
    resizeCanvas: function() {
        var canvas = $('.synthCanvas'),
            container = $('.canvasContainer');
        canvas[0].width = container[0].clientWidth;
        canvas[0].height = canvas.width() / 1.333;
        container.css({
            marginTop: -canvas.height() / 2,
            marginLeft: -canvas.width() / 2
        });
        WebSynthEvents.trigger('resize', {width: canvas.width(), height: canvas.height()});
    }
}