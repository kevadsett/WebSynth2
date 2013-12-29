function normalise(value, low, high) {		
	var range = high - low;
	return (value - low) / range;
}
 
function mapValue(value, lo1, hi1, lo2, hi2){
	var normal = normalise(value, lo1, hi1);
	return normal * (hi2 - lo2) + lo2;
}