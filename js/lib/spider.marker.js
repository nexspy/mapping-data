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
  
  
  
  //
  // properties (for styling) -----------
  //
  
  
  // width of the stroke
  this.strokeWidth = 1;
  // color of the stroke (black)
  this.strokeStyle = new spider.Color(0,0,0,1);
  // background fill (white)
  this.backgroundFill = new spider.Color();
  
  
  
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
    
    that.dots[i] = new spider.Dot(this, i);
    that.dots[i].init();
  }
}


/**
 * Draw the marker
 * 
 */
spider.Marker.prototype.draw = function() {
  //
  var context = this.parent.context;
  //
  if (this.dots.length > 0) {
    context.beginPath();
    context.moveTo(this.dots[0].point.x, this.dots[0].point.y);
    // move to each dot
    for (var i=0; i<this.dots.length; i++) {
      var next = i+1;
      if (i == this.dots.length-1) {
        next = 0;
      }
      context.lineTo(this.dots[next].point.x, this.dots[next].point.y);
    }
    context.closePath();
    
    context.lineWidth = this.strokeWidth;
    context.strokeStyle = this.strokeStyle.get_rgb();
    context.fillStyle = this.fillStyle.get_rgb();
    context.fill();
    context.stroke();
  }
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
 * Iterate through all dots
 * 
 */
spider.Marker.prototype.forEachDot = function(op) {
  for (var i=0; i<this.dots.length; i++) {
    var dot = this.dots[i];
    op(dot);
  }
}


/**
 * Constructor for class Dot
 * 
 */
spider.Dot = function(parent, id) {
  
  this.id = id || 0;
  
  // Angle from x-axis horizon
  //
  this.angle = 0;
  
  // point (position)
  //
  this.point = new spider.Point();
  
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
  
  // get the data
  var value = marker.data[that.id].value;
  var max = marker.data[that.id].max;
  var min = marker.data[that.id].min;
  
  // calculate distance of dot from center
  //
  var ratio = marker.convertToPercent(value, max, min);
  var distance = map.radius * (ratio/100);
  
  // beforehand calculation
  var single_div = map.fullAngle/map.sides;
  // calculated angle
  var angle = single_div * that.id + map.adjustAngle;
  var angleRadian = spider.toRadians(angle);
  // init points
  that.point.x = distance * Math.cos(angleRadian) + map.center.x;
  that.point.y = distance * Math.sin(angleRadian) + map.center.y;
  
}


spider.Dot.prototype.update = function(data) {
  
  // fill the dots with data
  for (var i=0; i<data.length; i++) {
    //
  }
  
}
