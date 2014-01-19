function normalise(value, low, high) {		
	var range = high - low;
	return (value - low) / range;
}
 
function mapValue(value, lo1, hi1, lo2, hi2){
	var normal = normalise(value, lo1, hi1);
	return normal * (hi2 - lo2) + lo2;
}

function degToRad(value) {
    return value * (Math.PI / 180);
}

function radToDeg(value) {
    return value * (180 / Math.PI);
}

function toDecimalPlaces(value, places) {
    var power = Math.pow(10, places);
    return (Math.round(power * value)) / power;
}

function drawSineIcon(context, x, y, size) {
    var increment = 0.5;
    context.beginPath();
    context.moveTo(x, y);
    for(var i = 0; i < 2 * Math.PI; i+= increment) {
        context.lineTo(x + i * size / (Math.PI / increment), y + (size / (Math.PI / increment /3) * Math.sin(i)));
    }
    context.stroke();
    context.closePath();
}

function drawSquareIcon(context, x, y, size) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + size/2);
    context.lineTo(x + size/2, y + size/2);
    context.lineTo(x + size/2, y - size/2);
    context.lineTo(x + size, y - size/2);
    context.lineTo(x + size, y);
    context.stroke();
    context.closePath();
}

function drawSawIcon(context, x, y, size) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + size/2, y + size/2);
    context.lineTo(x + size/2, y - size/2);
    context.lineTo(x + size, y);
    context.stroke();
    context.closePath();
}

function drawTriIcon(context, x, y, size) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + size/4, y + size/2);
    context.lineTo(x + 3 * size/4, y - size/2);
    context.lineTo(x + size, y);
    context.stroke();
    context.closePath();
}

function getKeyboardNumber(charCode, synthModel) {
    var keyPressed = String.fromCharCode(event.which),
        keyIndex = _.indexOf(WebSynthModel.KEYBOARD_KEYS, keyPressed);
    if(keyIndex !== -1) {
        if (event.shiftKey) keyIndex += 12;
        keyIndex += NoteConverter.getNoteNumberFromName(synthModel.get('bottomNote'));
        return keyIndex;
    }
    return -1;
}