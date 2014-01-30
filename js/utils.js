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