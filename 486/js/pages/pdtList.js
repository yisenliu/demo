'use strict';
var $bannerCarousel = $('.banners'),
  $container = $('.container'),
  $selectedOption = $('.selectedOption'),
  $options = $('.options'),
  $optionsLabel = $('.options > *'),
  $optionsRadio = $options.find('input:radio');

// Carousel
// -------------------------------------
$bannerCarousel.owlCarousel({
  autoPlay: true,
  pagination: true,
  singleItem: true
});

$selectedOption.on('click', function(e) {
  e.stopPropagation();
  $(this).next().toggleClass('active');
});

$optionsRadio.on('change', function(e) {
  var $this = $(this),
    $thisOptions = $this.closest('.options'),
    $thisSelectedOption = $thisOptions.siblings('.selectedOption');

  e.stopPropagation();
  $thisOptions.removeClass('active');
  $thisSelectedOption.text($this.next().text());
  console.log($this.next().text());
});

$optionsLabel.on('click', function(e) {
  e.stopPropagation();
});

$container.on('click', function(e) {
  // alert(e.target.tagName);
  if (!$options.is(e.target)) {
    $options.removeClass('active');
  }
});

// $(document).click(function(){...});在iOS上沒作用的解法
// $(document).on('click', function(e) {
//   alert(e.target.tagName);
//   if (!$options.is(e.target)) {
//     $options.removeClass('active');
//   }
// });
// $('body').children().click(function() {
// });
