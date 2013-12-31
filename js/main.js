// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$("document").ready(function() {
    window.WebSynth = new WebSynthModel();
    $(window).on('resize', ResizeController.resizeCanvas);
    mainLoop();
    function mainLoop() {
        requestAnimFrame(mainLoop);
        WebSynthEvents.trigger('render');
    }
});