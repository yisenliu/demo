'use strict';
var $wall = $('.wall'),
  $wishPdt = $('.wall-tile'),
  $delete = $('.delete'),
  itemAmount = $wishPdt.length;

// 移除清單項目
$delete.data('counter', 0).on('click', function(e) {
  var $this = $(this),
    $targetPdt = $this.closest('.wall-tile'),
    i = $this.data('counter');

  e.stopPropagation();
  $this.data('counter', ++i);
  if (i < 2) {
    // 初次click，顯示確認字樣
    $this.addClass('confirm');
  } else {
    // 再次click，正式移除
    $targetPdt.stop().fadeOut(300, function() {
      $(this).remove();
      if (--itemAmount <= 0) {
        $wall.addClass('isEmpty');
      }
    });
  }
});

$(document).on('click', '.container', function() {
  $delete.removeClass('confirm').data('counter', 0);
});

$wall.on('click', '.wall-tile', function(e) {
  e.stopPropagation();
  $(this).find('.delete').removeClass('confirm').data('counter', 0);
});

// init
if (itemAmount <= 0) {
  $wall.addClass('isEmpty');
}
