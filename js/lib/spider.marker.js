var spider = spider || {};



/**
 * Constructor
 * 
 * @param {type} id
 * @param {type} context
 */
spider.Marker = function(parent, data, name) {
  
  //
  this.name = name || "";
  
  // The information required to create a marker
  //
  this.data = data || [];
  
  
  //
  // All the dots that make a complete marker
  //
  this.dots = [];
  
  //
  // Pointer to parent
  //
  this.parent = parent;
  
  
  // initialize once
  this.init();
  
  
  return this;
}



/**
 * Initialize marker
 * 
 */
spider.Marker.prototype.init = function() {
  //
  this.createDots();
}



/**
 * Initialize a markers with dots
 * 
 */
spider.Marker.prototype.createDots = function() {
  // global
  var that = this;
  var parent = this.parent;
  //
  for (var i=0; i<parent.sides; i++) {
    that.dots[i] = new spider.Dot(this);
    that.dots[i].init();
  }
}


/**
 * Draw the marker
 * 
 */
spider.Marker.prototype.draw = function() {
  //
}


/**
 * Convert given value to percentage value
 * 
 * @param {type} value
 * @param {type} max
 * @param {type} min
 */
spider.Marker.prototype.convertToPercent = function(value, max, min) {
  var result = ((max - value)/(max - min)) * 100;
  return result;
}



/**
 * Constructor for class Dot
 * 
 */
spider.Dot = function(parent) {
  
  // points
  //
  this.points = [];
  
  // values
  //
  this.value = 0;
  this.max = 0;
  this.min = 0;
  
  
  // parent
  this.parent = parent;
  
  
  return this;
}


/**
 * Initialize the dot
 * 
 */
spider.Dot.prototype.init = function() {
  var that = this;
  var marker = this.parent;
  var map = this.parent.parent;
  
  
  // init points
  for (var i=0; i<map.sides; i++) {
    that.points[i] = new spider.Point();
    that.update(map);
  }
}


spider.Dot.prototype.update = function(data) {
  
  // fill the dots with data
  for (var i=0; i<data.length; i++) {
    //
  }
  
}



