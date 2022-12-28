'use strict';
var $ajaxModal = $('#ajaxModal'),
  $doc = $(document),
  $modalTrigger = $('.orderCancel, .qa, .returnApply, .writeReview'),
  // $receiptPrint = $('.receiptPrint'),
  $transferInfoToggle = $('.transferInfo .form-label');

// headroom.js
$('.header2').headroom({
  offset: 0,
  tolerance: 0,
  scroller: document.querySelector('.container')
});
// $('.header2').headroom();

swal.setDefaults({
  showConfirmButton: false,
  timer: 3000,
  type: 'success'
});

// Modal
// -------------------------------------
$modalTrigger.modal({
  afterLoad: function() {
    var $btn_qaSubmit = $('.qaForm').find('.btnSubmit'),
      $btn_cancelSubmit = $('.cancelForm').find('.btnSubmit'),
      $btn_returnApplySubmit = $('.returnApplyForm').find('.btnSubmit'),
      $btn_writeReviewSubmit = $('.writeReviewForm').find('.btnSubmit');

    // 問與答
    if ($btn_qaSubmit.length) {
      $btn_qaSubmit.one('click', function() {
        swal({
          title: '留言已送出！',
          text: '客服人員將儘快為您處理'
        }, function() {
          // 送出後，自動關閉modal
          swal.close();
          $ajaxModal.trigger('click');
        });
      });
      return;
    }

    // 取消訂單
    if ($btn_cancelSubmit.length) {
      $btn_cancelSubmit.one('click', function() {
        swal({
          title: '我們會儘快處理您的申請。',
          text: '再次提醒您，486團購保有取消申請同意與否之權利。'
        }, function() {
          // 送出後，自動關閉modal
          swal.close();
          $ajaxModal.trigger('click');
        });
      });
      return;
    }

    // 申請退貨
    if ($btn_returnApplySubmit.length) {
      $btn_returnApplySubmit.one('click', function() {
        swal({
          title: '我們會儘快處理您的退貨申請。',
          text: '再次提醒您，486團購保有退貨申請同意與否之權利。'
        }, function() {
          // 送出後，自動關閉modal
          swal.close();
          $ajaxModal.trigger('click');
        });
      });
      return;
    }

    // 使用心得
    if ($btn_writeReviewSubmit.length) {
      $btn_writeReviewSubmit.one('click', function() {
        swal({
          title: '感謝您的分享！',
          text: '486團購有您真好。'
        }, function() {
          // 送出後，自動關閉modal
          swal.close();
          $ajaxModal.trigger('click');
        });
      });
    }
  }
});

// 列印
// -------------------------------------
// $receiptPrint.on('click', function() {
//   window.print();
// });

// 轉帳資訊
// -------------------------------------
$transferInfoToggle.on('click', function() {
  $(this).next().toggleClass('active');
});


// 輸入銀行代碼
// -------------------------------------
$doc.on('change', '.bankSelect', function() {
  var value = $(this).children().filter('option:checked').val();
  if (value == 'manual') {
    $ajaxModal.animate({
      scrollTop: $('.bankContainer').offset().top
    }, 200, function(){
      $('.bankInput').val('').prop('readonly', false).trigger('focus');
    });
  } else {
    $('.bankInput').val(value).prop('readonly', true);
  }
});
