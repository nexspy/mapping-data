var spider = spider || {};



/**
	Converts an angle from degrees to radians
	@param {float} angle angle in degrees
	@return {float} angle in radians
	@method toRadians
**/
spider.toRadians = function(angle)
{
	return angle * Math.PI / 180.0;
}

/**
	Converts an angle from radians to degrees
	@param {float} angle angle in radians
	@return {float} angle in degrees
	@method toDegrees
**/
spider.toDegrees = function(angle)
{
	return angle * 180.0 / Math.PI;
}

/**
	Returns the sign of the value
	@param numeric value
	@return -1 if x < 0 else 1
	@method sign
**/
spider.sign = function(x)
{
	return x >= 0.0 ? 1.0 : -1.0;
}


/**
	Maps an angle to the range [0, 2 * PI]
	@static
	@param x an angle in radians
	@return angle mapped to range [0, 2 * PI]
	@method wrapAngle
**/
spider.wrapAngle = function(x)
{
	var TWO_PI = Math.PI * 2;
	while(x >= TWO_PI)
	{
		x -= TWO_PI;
	}
	
	while(x < 0)
	{
		x += TWO_PI;
	}
	
	
	return x;
}
