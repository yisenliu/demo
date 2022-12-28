"use strict";
var $email = $(".email");
var $agreement = $(".agreement");
var $btnMemberSubmit = $(".btnMemberSubmit");
var $btnFirstTime = $(".btnFirstTime");
var $eye = $(".eye");
var $mobilePhone = $(".mobilePhone");
var $passwd = $(".passwd");
var $logistics = $(".logistics");
var $logisticsItem = $(".logistics-item");
var $guestTabsItem = $(".guestModal .tabs > li");
var tabIndex = Number(url("?t")) || 0;
var $cartItem = $(".cartItems > .media");
var $cartItemRemove = $(".media-remove");
var $cartItems = $(".cartItems");
var $CTA = $(".callToAction button");
var $shoppingDetails = $(".shoppingDetails");
// var itemsInCart = $cartItem.length;
// var checkCartState = function() {
//     if (itemsInCart === 0) {
//       // 購物車已清空
//       var feedbackMsg = '',
//         timerInt,
//         timer = 3;

//       feedbackMsg = '<div class="emptyMsg">';
//       feedbackMsg += '<h3>';
//       feedbackMsg += 'OOPS!';
//       feedbackMsg += '</h3>';
//       feedbackMsg += '<p>';
//       feedbackMsg += '您的購物車是空的！系統將在';
//       feedbackMsg += '<strong>';
//       feedbackMsg += timer.toString();
//       feedbackMsg += '</strong>';
//       feedbackMsg += '秒後返回首頁…';
//       feedbackMsg += '</p>';
//       feedbackMsg += '</div>';

//       $shoppingDetails.empty().html(feedbackMsg);
//       timerInt = setInterval(function() {
//         $('.emptyMsg strong').text(--timer);
//         if (timer === 0) {
//           clearInterval(timerInt);
//           window.open('index.htm', '_top');
//         }
//       }, 1000);
//     }
//   };

// 移除購物車商品
// -------------------------------------
// $('.logistics-panel').on('click', '.media-remove', function() {
//   var $item = $(this).closest('.media');
//   $item.slideUp('fast', function() {
//     $item.remove();
// itemsInCart--;
// checkCartState();
//   });
// });

// 立即結帳
// -------------------------------------
var isLogin = false;
if (isLogin) {
  // 已登入會員
  // $CTA.on('click', function() {});
} else {
  //未登入
  $CTA.modal();
}

// 會員登入/密碼/註冊
// -------------------------------------
$guestTabsItem.on("click", function () {
  var $this = $(this);
  tabIndex = $this.index();
  $this.addClass("active").siblings().removeClass("active");
  switch (tabIndex) {
    case 0: // 會員登入
      $email
        .find(".form-control")
        .attr("placeholder", "請輸入已註冊會員的email");
      $passwd.slideDown().children(".form-label").text("密碼");
      $mobilePhone.slideUp();
      $agreement.slideUp();
      $btnMemberSubmit.text("登入");
      break;

    case 1: // 忘記密碼
      $email
        .find(".form-control")
        .attr("placeholder", "新密碼將發送到您註冊的email信箱");
      $passwd.slideUp();
      $mobilePhone.slideUp();
      $agreement.slideUp();
      $btnMemberSubmit.text("取得新密碼");
      break;

    case 2: // 加入會員
      $email
        .find(".form-control")
        .attr("placeholder", "本email將作為收取各種通知信");
      $passwd.slideDown().children(".form-label").text("設定密碼");
      $mobilePhone.slideDown();
      $agreement.slideDown();
      $btnMemberSubmit.text("註冊");
      break;

    default:
      break;
  }
  return false;
});

$eye.on("click", function () {
  var $this = $(this);
  $this.toggleClass("eye-open");
  if ($this.hasClass("eye-open")) {
    $this.siblings(".form-control").attr("type", "text");
  } else {
    $this.siblings(".form-control").attr("type", "password");
  }
});

$guestTabsItem.eq(tabIndex).trigger("click");

// 首次購物按鈕
// -------------------------------------
$btnFirstTime.on("click", function () {
  window.open("shippingInfo.htm", "_top");
});

// 檢查購物車狀態
// -------------------------------------
// checkCartState();

// 購物流程標示
// -------------------------------------
$(".flows").addClass("step1");

// 物流選單
// -------------------------------------
$logistics.owlCarousel({
  itemsDesktop: [768, 5],
  itemsMobile: [767, 3],
  navigation: true,
  navigationText: false,
  pagination: false,
});
$logisticsItem
  .on("click", function () {
    $logisticsItem.removeClass("active");
    $(this).addClass("active");
  })
  .eq(0)
  .trigger("click");
