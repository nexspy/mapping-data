var spider = spider || {};


/**
 * Constructor
 * 
 * @param {type} id
 * @param {type} context
 */
spider.Spider = function(id, context, width, height) {
  
  //
  // canvas options
  //
  this.context = context;
  this.width = width;
  this.height = height;
  // total angle to cover
  this.fullAngle = 360;
  // move spider by given angle
  this.adjustAngle = 0;
  
  
  
  //
  // properties (for calculation) -----------
  //
  
  // total number of sides (minimum is 3)
  this.sides = 3;
  
  // the radius of the spider
  this.radius = 200;
  
  // total number of inner levels (can be any number from 1)
  this.levels = 4;
  
  // distance of label from corners
  this.textOffset = 12;
  
  // data for markers
  this.dataMarkers = [];
  
  
  
  //
  // properties (for styling) -----------
  //
  
  
  // width of the stroke
  this.strokeWidth = 1;
  // color of the stroke (black)
  this.strokeStyle = new spider.Color(0,0,0,1);
  // background fill (white)
  this.backgroundFill = new spider.Color();
  
  
  
  // positions
  //
  this.center = new spider.Point(width/2, height/2);
  //
  this.corners = [];
  
  
  // Labels
  this.labels = [];
  
  // Markers
  this.markers = [];
  this.totalMarkers = 1;
  
  
  // create an instance of this class
  return this;
  
}



/**
 * Draw the map
 * 
 */
spider.Spider.prototype.draw = function() {
  // 
  this.clear();
  //
  this.drawRadi();
  //
  this.drawSegments();
  //
  this.drawLabel();
  //
  this.drawMarkers();
  
}
/**
 * Refresh the map
 * 
 */
spider.Spider.prototype.refresh = function() {
  //
//  this.drawSegments();
}


/**
 * Clear the spider
 * 
 */
spider.Spider.prototype.clear = function() {
  this.context.clearRect(0, 0, cwidth, cheight);
}



/**
 * Initialize the spider
 *  - create necessary instances/childs
 * 
 */
spider.Spider.prototype.init = function(dataMarkers) {
  
  // 0. store markers data
  //
  this.dataMarkers = dataMarkers;
  
  
  // 1. create corners and labels
  var index = 0;
  for (var i = 0; i < this.sides; i++) {
    this.corners[index] = new spider.Point();
    index++;
  }
  
  // 2. calculate labels
  index = 0;
  var single_div = this.fullAngle/this.sides;
  var angles = [];
  var moveBy = this.adjustAngle;
  for (var i = 0 + moveBy; i < this.fullAngle+moveBy; i += single_div) {
    // radian angle
    var angle = spider.toRadians(i);
    // update a corner
    this.corners[index].x = this.radius * (Math.cos(angle)) + this.center.x;
    this.corners[index].y = this.radius * (Math.sin(angle)) + this.center.y;
    angles[index] = i;
    index++;
  }
  
  index = 0;
  for (var i = 0 + moveBy; i < this.fullAngle+moveBy; i += single_div) {
    // create label
    this.labels[index] = new spider.Label('', this.context);
    // set text
    this.labels[index].text = 'Label ' + index;
    // radian angle
    var angle = spider.toRadians(i);
    // set position
    this.labels[index].position.x = (this.radius + this.textOffset) * (Math.cos(angle)) + this.center.x;
    this.labels[index].position.y = (this.radius + this.textOffset) * (Math.sin(angle)) + this.center.y;
    // set alignments
    if ((angles[index] > 270 && angles[index] < 360) || (angles[index] > 0 && angles[index] < 90)) {
      this.labels[index].textAlign = "left";
    } else if ((angles[index] > 90 && angles[index] < 270)) {
      this.labels[index].textAlign = "right";
    }
    // move texts with more than one line (when using allowWrap)
    if ((angles[index] > 0 && angles[index] < 180)) {
      if (this.labels[index].get_lines() > 1) {
        this.labels[index].position.y += this.labels[index].get_lines() * 20/2;
      }
    } else if ((angles[index] > 180 && angles[index] < 360)) {
      if (this.labels[index].get_lines() > 1) {
        this.labels[index].position.y -= this.labels[index].get_lines() * 40/2;
      }
    }
    
    //
    index++;
  }
  
  
  // 3. create Markers
  for (var i=0; i<this.totalMarkers; i++) {
    this.markers[i] = new spider.Marker(this, this.dataMarkers[i].data, 'marker_' + i);
  }
}


/**
 * Draw line between given points
 * 
 * @param {type} fromX
 * @param {type} fromY
 * @param {type} toX
 * @param {type} toY
 */
spider.Spider.prototype.drawLine = function (fromX, fromY, toX, toY) {
  this.context.beginPath();
  this.context.moveTo(fromX, fromY);
  this.context.lineTo(toX, toY);
  this.context.lineWidth = this.strokeWidth;
  this.context.strokeStyle = this.strokeStyle.get_rgb();
  this.context.fillStyle = this.backgroundFill.get_rgb();
  this.context.stroke();
}


/**
 * Draw the outmost shape,
 * can be used to have background fill color
 * 
 */
spider.Spider.prototype.drawOutmostShape = function() {
  // go to start point (first corner)
  this.context.beginPath();
  this.context.moveTo(this.corners[0].x, this.corners[0].y);
  //
  for (var j = 0; j < this.corners.length; j++) {
    var next = j+1;
    if (j == this.corners.length-1) {
      next = 0;
    }
    this.context.lineTo(this.corners[next].x, this.corners[next].y);
  }
  this.context.closePath();
  this.context.lineWidth = this.strokeWidth;
  this.context.strokeStyle = this.strokeStyle.get_rgb();
  this.context.fillStyle = this.backgroundFill.get_rgb();
  this.context.fill();
  this.context.stroke();
}



/**
 * Draw single radi from center to the corners
 * 
 * @param {type} fromX
 * @param {type} fromY
 * @param {type} toX
 * @param {type} toY
 */
spider.Spider.prototype.drawRadius = function (index) {
  // second point is the corner
  var xx = this.corners[index].x;
  var yy = this.corners[index].y;
  // draw it
  this.drawLine(this.center.x, this.center.y, xx, yy);
}

/**
 * Draw radi from center to corners
 * 
 * @returns {undefined}
 */
spider.Spider.prototype.drawRadi = function () {
  // draw radius
  //
  for (var i = 0; i < this.sides; i++) {
    // single radii
    this.drawRadius(i);
  }
}




/**
 * Draw segments (levels)
 * 
 */
spider.Spider.prototype.drawSegments = function() {
  // calculate distance
  var distance_between_segments = this.radius/this.levels;
  var distance_from_center = 0;
  // angles
  var single_div = this.fullAngle/this.sides;
  var moveBy = this.adjustAngle;
  var current_angle = single_div;
  var angle = 0;
  
  // draw the outmost shape with bg fill
  distance_from_center = this.radius;
  this.drawOutmostShape();
  
  // draw all levels
  for (var i = 1; i< this.levels ; i++) {
    // draw single segment
    distance_from_center = distance_between_segments * (i);
    var index = 0;
    var corners = [];
    // calculate corners for this segment
    for (var j = 0 + moveBy; j < this.fullAngle+moveBy; j += single_div) {
      angle = spider.toRadians(j);
      corners[index] = new spider.Point();
      corners[index].x = distance_from_center * Math.cos(angle) + this.center.x;
      corners[index].y = distance_from_center * Math.sin(angle) + this.center.y;
      index++;
    }
    // draw segment from corners
    for (var j = 0; j<index; j++) {
      var current = j;
      var next = current+1;
      if (j == index-1) {
        next = 0;
      }
      this.drawLine(corners[current].x, corners[current].y, corners[next].x, corners[next].y);
    }
  }//end-loop-level
}


/**
 * Iterate through all labels
 * 
 */
spider.Spider.prototype.forEachLabel = function(op) {
  for (var i=0; i<this.labels.length; i++) {
    var label = this.labels[i];
    op(label);
  }
}

/**
 * Draw labels
 * 
 */
spider.Spider.prototype.drawLabel = function() {
  //
  for (var i=0; i<this.sides; i++) {
    this.labels[i].draw(this.context);
  }
}


/**
 * Iterate through all markers
 * 
 */
spider.Spider.prototype.forEachMarker = function(op) {
  for (var i=0; i<this.markers.length; i++) {
    var marker = this.markers[i];
    op(marker);
  }
}


/**
 * Draw each markers
 * 
 */
spider.Spider.prototype.drawMarkers = function() {
  
  for (var i=0; i<this.markers.length; i++) {
    //
    this.markers[i].draw();
  }
  
}