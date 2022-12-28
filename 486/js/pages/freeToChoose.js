'use strict';

$('.btnAdd,.btnCancel').on('click', function(event) {
  var $currentItem = $(this).closest('.select-item');
  var $formElements = $currentItem.find('.quantityInput *, .spec .form-control');

  $(this)
    .toggle()
    .siblings('button')
    .toggle();
  if (event.currentTarget.classList.contains('btnAdd')) {
    $formElements.prop('disabled', true).css('pointer-events', 'none');
  } else {
    $formElements.prop('disabled', false).css('pointer-events', '');
  }
});
