var ResizeController = {
    resizeCanvas: function() {
        var newHeight = $(window)[0].innerHeight;
        var newWidth = $(window)[0].innerWidth;
        var canvas = $('.synthCanvas'),
        container = $('.canvasContainer');
        console.log(canvas);
        console.log("container[0].clientWidth: " + container[0].clientWidth);
        canvas[0].width = container[0].clientWidth;
        canvas[0].height = canvas.width() / 1.333;
        container.css({
            marginTop: -canvas.height() / 2,
            marginLeft: -canvas.width() / 2
        });
        console.log(newWidth, newHeight);
    }
}