'use strict';

// Carousel
// -------------------------------------
$('#banners2,#banners3').owlCarousel({
  autoPlay: true,
  pagination: true,
  singleItem: true
});

// Modal
// -------------------------------------
MYAPP.openModal = function() {
  $('.modalTrigger')
    .modal()
    .trigger('click');
};
