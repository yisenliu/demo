'use strict';
var $tabLink = $('.tabs a'),
  $panel = $('.panel');

// Tabs
// -------------------------------------
$tabLink.on('click', function(e) {
  e.preventDefault();
  var $this = $(this),
    $targetPanel = $('#' + $this.data('panel'));

  $tabLink.removeClass('active').filter($this).addClass('active');
  $panel.removeClass('active').filter($targetPanel).addClass('active');
})
