'use strict';
var $ajaxModal = $('#ajaxModal'),
  $delete = $('.delete'),
  $modalTrigger = $('.add, .modify'),
  $wall = $('.wall');

swal.setDefaults({
  showConfirmButton: false,
  timer: 1000,
  type: 'success'
});

// Modal
// -------------------------------------
$modalTrigger.modal({
  beforeLoad: function(e) {
    // 檢查收件人數量
    if ($(e.target).hasClass('add') && $('.card').length > 5) {
      swal({
        timer: 2000,
        title: '收件人已達上限，無法再新增。',
        type: 'warning'
      });
      return false;
    }
    return true;
  },
  afterLoad: function(e) {
    // 新增、修改收件人
    if ($(e.target).hasClass('add')) {
      $('.modal-head').text('新增收件人');
      $('.btnSubmit').text('新增').one('click', function() {
        swal({
          title: '新增成功！'
        }, function() {
          // 送出後，自動關閉modal
          swal.close();
          $ajaxModal.trigger('click');
        });
      });
    } else {
      $('.modal-head').text('修改收件人');
      $('.btnSubmit').text('儲存').one('click', function() {
        swal({
          title: '修改成功！'
        }, function() {
          // 送出後，自動關閉modal
          swal.close();
          $ajaxModal.trigger('click');
        });
      });
    }
  }
});

$delete.data('state', 0).on('click', function(e) {
  var $this = $(this),
    $targetCard = $this.closest('.card'),
    i = $this.data('state');

  e.stopPropagation();
  $this.data('state', ++i);
  if (i < 2) {
    $this.addClass('confirm').text('確定刪除？');
  } else {
    $targetCard.stop().slideUp(300, function() {
      $(this).remove();
    });
  }
});

$wall.on('click', '.card', function(e) {
  $(this).children('.delete').removeClass('confirm').data('state', 0).text('刪除');
  return false;
});

$(document).on('click', '.container', function() {
  $('.card').children('.delete').removeClass('confirm').data('state', 0).text('刪除');
});
