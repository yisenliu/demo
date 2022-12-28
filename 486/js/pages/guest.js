'use strict';
var $email = $('.email'),
  $agreement = $('.agreement'),
  $btnMemberSubmit = $('.btnMemberSubmit'),
  $eye = $('.eye'),
  $mobilePhone = $('.mobilePhone'),
  $passwd = $('.passwd'),
  $tabsItem = $('.tabs > li'),
  tabIndex = Number(url('?t')) || 0;

// 會員登入/密碼/註冊
// -------------------------------------
$tabsItem.on('click', function() {
  var $this = $(this);

  tabIndex = $this.index();
  $this.addClass('active').siblings().removeClass('active');
  switch (tabIndex) {
    case 0: // 會員登入
      $email.find('.form-control').attr('placeholder', '請輸入已註冊會員的email');
      $passwd.slideDown().children('.form-label').text('密碼');
      $mobilePhone.slideUp();
      $agreement.slideUp();
      $btnMemberSubmit.text('進入會員專區');
      break;

    case 1: // 忘記密碼
      $email.find('.form-control').attr('placeholder', '新密碼將發送到您註冊的email信箱');
      $passwd.slideUp();
      $mobilePhone.slideUp();
      $agreement.slideUp();
      $btnMemberSubmit.text('取得新密碼');
      break;

    case 2: // 加入會員
      $email.find('.form-control').attr('placeholder', '本email將作為收取各種通知信');
      $passwd.slideDown().children('.form-label').text('設定密碼');
      $mobilePhone.slideDown();
      $agreement.slideDown();
      $btnMemberSubmit.text('註冊');
      break;

    default:
      break;
  }
  return false;
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

$tabsItem.eq(tabIndex).trigger('click');
