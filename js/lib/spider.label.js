var spider = spider || {};


/**
 * Constructor
 * 
 */
spider.Label = function(text, context) {
  
  this.context = context;
  
  // properties
  //
  this.text = text;
  // width
  this.maxWidth = 200;
  // height
  this.lineHeight = 25;
  // position
  this.position = new spider.Point();
  // allow wraping of text
  this.allowWrap = true;
  
  // styling
  //
  this.color = new spider.Color(0,0,0);
  this.font = 'italic 12pt Calibri';
  this.textAlign = 'center';
  
}



/**
 * Draw the text of the label
 * 
 */
spider.Label.prototype.draw = function() {
  if (this.allowWrap) {
    // draw wrapped text
    this.wrapText(this.context, this.text, this.position.x, this.position.y, this.maxWidth, this.lineHeight);
  } else {
    // draw simple text
    this.noWrapText(this.context, this.text, this.position.x, this.position.y);
  }
}

/**
 * Draw text in straight line
 *  - no wrap
 *  
 * @param {type} context
 * @param {type} text
 * @param {type} x
 * @param {type} y
 */
spider.Label.prototype.noWrapText = function(context, text, x, y) {
  context.font = this.font;
  context.textAlign = this.textAlign;
  context.fillStyle = this.color.get_hex();
  context.fillText(text, x, y);
}



/**
 * Wrap text
 * 
 * @param {type} context
 * @param {type} text
 * @param {type} x
 * @param {type} y
 * @param {type} maxWidth
 * @param {type} lineHeight
 */
spider.Label.prototype.wrapText = function(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.font = this.font;
      context.textAlign = this.textAlign;
      context.fillStyle = this.color.get_hex();
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.font = this.font;
  context.textAlign = this.textAlign;
  context.fillStyle = this.color.get_hex();
  context.fillText(line, x, y);
}


/**
 * Get height of the text in pixel
 * 
 */
spider.Label.prototype.get_height = function() {
  var words = this.text.split(' ');
  var line = '';
  var total_lines = 1;
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = this.context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > this.maxWidth && n > 0) {
      line = words[n] + ' ';
      total_lines++;
    } else {
      line = testLine;
    }
  }
  return total_lines*this.lineHeight;
}

/**
 * Get number of lines of the text
 * 
 */
spider.Label.prototype.get_lines = function() {
  var words = this.text.split(' ');
  var line = '';
  var total_lines = 1;
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = this.context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > this.maxWidth && n > 0) {
      line = words[n] + ' ';
      total_lines++;
    } else {
      line = testLine;
    }
  }
  return total_lines;
}