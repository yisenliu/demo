'use strict';
var $subjectBar = $('.mail-subjectBar'),
  $container = $('.container');

$subjectBar.on('click', function() {
  var $this = $(this);
  $this.toggleClass('active').addClass('viewed').next().slideToggle('fast', function() {
    if ($this.hasClass('active')) {
      $container.stop().animate({
        scrollTop: $this.position().top - 10
      }, 'fast');
    }
  });
});
