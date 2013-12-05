var spider = spider || {};


/**
 * Constructor
 * 
 */
spider.Color = function(r, g, b, a) {
  
  this.hex = '#ffffff';
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.a = 1;
  
  // use any provided color (if given any)
  this.init(r,g,b,a);
  
}


/**
 * Convert red, green and blue values to hex
 * 
 */
spider.Color.prototype.get_hex = function() {
  if(this.r < 0 || this.r > 255) console.log("r is out of bounds; "+r);
  if(this.g < 0 || this.g > 255) console.log("g is out of bounds; "+g);
  if(this.b < 0 || this.b > 255) console.log("b is out of bounds; "+b);
  return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1,7);
}


/**
 * Save hex properties to r,g,b format
 *  - used when changing hex value, and automatically change the rgb values
 * 
 */
spider.Color.prototype.set_hex = function(hex) {
  var old_hex = hex.substring(1); // removes hash #
  var bigint = parseInt(old_hex, 16);
  this.r = (bigint >> 16) & 255;
  this.g = (bigint >> 8) & 255;
  this.b = bigint & 255;
  // also, change the current hex
  this.hex = hex;
}


/**
 * Convert hex to rgb value (dont use # at front)
 * 
 */
spider.Color.prototype.get_rgb = function() {
  var hex = this.hex.substring(1); // removes hash #
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return "rgba(" + r + "," + g + "," + b + "," + this.a + ")";
}


/**
 * Initialize the object with given values
 * 
 * @param {type} r
 * @param {type} g
 * @param {type} b
 * @param {type} a
 */
spider.Color.prototype.init = function(r,g,b,a) {
  if (typeof r !== 'undefined') {
    if (r >=0 && r<= 255) {
      this.r = r;
    }
  }
  if (typeof g !== 'undefined') {
    if (g >=0 && g<= 255) {
      this.g = g;
    }
  }
  if (typeof b !== 'undefined') {
    if (b >=0 && b<= 255) {
      this.b = b;
    }
  }
  if (typeof a !== 'undefined') {
    if (a >=0 && a<= 255) {
      this.a = a;
    }
  }
  // update hex value
  this.hex = this.get_hex();
}