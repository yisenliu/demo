'use strict';
var $btn_querySubmit = $('.queryModal .btn--primary'),
  $modalTrigger = $('.queryAgain'),
  $queryModal = $('.queryModal');

// Modal
// -------------------------------------
$modalTrigger.modal();

// 我要發問
// -------------------------------------
$btn_querySubmit.on('click', function() {
  swal({
    title: '留言已送出！',
    text: '客服人員將儘快為您處理',
    type: 'success'
  }, function() {
    // 送出留言後，關閉留言界面
    $queryModal.trigger('click');
  });
});
