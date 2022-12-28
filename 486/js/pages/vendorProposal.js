'use strict';
var $cbController = $('.checkbox').find('input:checkbox'),
  $btnPrev = $('.btnPrev'),
  $btnNext = $('.btnNext'),
  $container = $('.container'),
  phases = $('.phases').owlCarousel({
    autoHeight: true,
    singleItem: true,
    pagination: false,
    rewindNav: false,
    touchDrag: false,
    mouseDrag: false,
    beforeMove: function() {
      // console.log(this.currentItem, this.maximumItem);
    },
    afterMove: function() {
      // console.log(this.currentItem, this.maximumItem);
      $container.animate({ scrollTop: 0 }, 400);
      switch (this.currentItem) {
        case 0:
          $btnPrev.addClass('hide').prop('disabled', true);
          $btnNext.addClass('full').text('下一步');
          break;
        case 1:
          $btnPrev.removeClass('hide').prop('disabled', false);
          $btnNext.removeClass('full').text('下一步');
          break;
        case 2:
          $btnPrev.removeClass('hide').prop('disabled', false);
          $btnNext.removeClass('full').text('確認送出');
          break;
        default:
          break;
      }
    }
  }).data('owlCarousel');

$cbController.on('change', function() {
  var $this = $(this),
    $relativeInput = $this.next().find('.form-control');

  if ($this.prop('checked')) {
    $relativeInput.prop('disabled', false);
    $relativeInput.trigger('focus');
  } else {
    $relativeInput.prop('disabled', true);
  }
});

// $btnPrev.on('click', function() {
//   if (phases.currentItem > 0) {
//     phases.prev();
//   }
// });

// $btnNext.on('click', function() {
//   if (phases.currentItem < phases.maximumItem) {
//     phases.next();
//   }
// });
