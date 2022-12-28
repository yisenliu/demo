'use strict';
var $reportItem = $('.mediaWall-tile');

$reportItem.on('click', function(){
  var reportLink = $reportItem.data('href');

  window.open(reportLink, '_top');
})