var spider = spider || {};



/**
 * Constructor
 * 
 */
spider.Point = function(x, y) {
  
  this.x = 0;
  this.y = 0;
  
  
  // init if any value given
  this.initialize(x,y);
  
}


/**
 * Initialize point with given values
 * 
 * @param {type} x
 * @param {type} y
 */
spider.Point.prototype.initialize = function(x, y) {
  
  if (typeof x !== 'undefined') {
    this.x = x;
  }
  if (typeof y !== 'undefined') {
    this.y = y;
  }
  
}