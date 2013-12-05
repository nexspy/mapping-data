//get a reference to the canvas
var mycanvas = $('#radar-map')[0];
var ctx = mycanvas.getContext("2d");
var cwidth = 760;
var cheight = 600;
var fullCircle = false;

// settings
var line_color = '#F2F2F2';
var fill_color = '#969696';
var radar_radius = 260;
var fullAngle = (fullCircle) ? 360 : 180;


var map = null;

jQuery(document).ready(function($) {
  
  // start here
  start();
  
  
  
  
  // 
  // Page events
  //
  
  // change the name of the labels
  jQuery('input[name=btn_lbl_changer]').click(function() {
    var new_text = jQuery('input[name=label_changer]').val();
    if (new_text.length > 0) {
      var index = 0;
      map.forEachLabel(function(label){
        label.text = new_text + ' ' + index;
        index++;
      })
      map.draw();
    }
  })
});


function start() {
  // initialize the map
  map = new spider.Spider('spi_01', ctx, cwidth, cheight);
  
  // init options
  map.radius = 200;
  map.adjustAngle = 30;
  map.sides = 3;
  map.levels = 5;
  map.center.y = 250;
  
  // segments settings
  map.strokeWidth = 2;
  map.strokeStyle = new spider.Color(0, 205, 190);
  map.backgroundFill = new spider.Color(99, 203, 213, 0.3);
  
  
  // data to setup markers
  var total_markers = 1;
  var data_markers = [];
  for (var i=0; i< total_markers; i++) {
    data_markers[i] = {
      id: i,
      data: {
        0: {
          name: 'demand',
          value: Math.floor(Math.random()*100),
          max: 100,
          min: 0
        },
        1: {
          name: 'time',
          value: Math.floor(Math.random() * (2050 - 2010 + 1)) + 2010,
          max: 2050,
          min: 2010
        },
        2: {
          name: 'effect',
          value: Math.floor(Math.random()*100),
          max: 100,
          min: 0
        },
//        3: {
//          name: 'cccc',
//          value: Math.floor(Math.random()*100),
//          max: 100,
//          min: 0
//        },
//        4: {
//          name: 'aaa',
//          value: Math.floor(Math.random()*100),
//          max: 100,
//          min: 0
//        },
//        5: {
//          name: 'bbb',
//          value: Math.floor(Math.random()*100),
//          max: 100,
//          min: 0
//        }
      }
    }
  }//end-markers-loop
  
  
  // initialize with given settings
  map.init(data_markers);
  
  
  map.markers[0].strokeWidth = 3;
  map.markers[0].fillStyle = new spider.Color(200,0,0,0.4);
  
  
  // labels settings
  //  - use forEachLoop
//  map.labels[0].color.set_hex("#002cde");
  
  map.draw();
  
  // clear it
//  map.clear();
}