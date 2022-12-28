'use strict';
var $btnSubmit = $('.btnSubmit'),
  $eye = $('.eye');

$btnSubmit.on('click', function() {
  swal({
    showConfirmButton: false,
    timer: 1500,
    type: 'success',
    title: '密碼更新成功！'
  });
});

$eye.on('click', function(){
  var $this = $(this);
  $this.toggleClass('eye-open');
  if($this.hasClass('eye-open')){
    $this.siblings('.form-control').attr('type','text');
  }else{
    $this.siblings('.form-control').attr('type','password');
  }
});