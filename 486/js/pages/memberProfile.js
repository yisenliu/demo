'use strict';
var $btnSubmit = $('.btnSubmit');

$btnSubmit.on('click', function() {
  swal({
    showConfirmButton: false,
    timer: 1500,
    type: 'success',
    title: '會員資料更新成功！'
  });
});
