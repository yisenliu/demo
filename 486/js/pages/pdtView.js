"use strict";
var $body = $("body"),
  $container = $(".container"),
  $CTA = $(".callToAction button"),
  $header = $(".header"),
  $relativePdtsCarousel = $(".relativePdts .carousel"),
  $btnQuerySubmit = $(".queryModal .btn--primary"),
  $modalTrigger = $(".viewBanks, .query"),
  $queryModal = $(".queryModal"),
  $slidePageTrigger = $(".slidePage-trigger"),
  $slidePage = $(".slidePage"),
  $slidePageBody = $slidePage.children(".slidePage-body"),
  $slidePageBack = $slidePage.find(".slidePage-back"),
  $slidePageTitle = $slidePage.find(".slidePage-head-middle"),
  $slidePageTriggerActive = null,
  $sync1 = $("#sync1"),
  $sync2 = $("#sync2"),
  $subLinks = $(".subLinks"),
  $trace = $(".trace"),
  $win = $(window),
  center = function (number) {
    var sync2visible = $sync2.data("owlCarousel").owl.visibleItems,
      num = number,
      found = false;

    for (var i in sync2visible) {
      if (num === sync2visible[i]) {
        found = true;
      }
    }
    if (found === false) {
      if (num > sync2visible[sync2visible.length - 1]) {
        $sync2.trigger("owl.goTo", num - sync2visible.length + 2);
      } else {
        if (num - 1 === -1) {
          num = 0;
        }
        $sync2.trigger("owl.goTo", num);
      }
    } else if (num === sync2visible[sync2visible.length - 1]) {
      $sync2.trigger("owl.goTo", sync2visible[1]);
    } else if (num === sync2visible[0]) {
      $sync2.trigger("owl.goTo", num - 1);
    }
  },
  syncPosition = function () {
    var current = this.currentItem;
    $sync2
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced");
    if ($sync2.data("owlCarousel") !== undefined) {
      center(current);
    }
  },
  moveSlidePagePosition = function () {
    if ($win.width() < 768) {
      if (!$container.next().hasClass("slidePage")) {
        $slidePage.insertAfter($container);
        // console.log('move to root');
      }
    } else {
      if ($container.next().hasClass("slidePage")) {
        $slidePage.insertAfter($subLinks);
        // console.log('move to inside');
      }
    }
  },
  winResizeHandler = function () {
    moveSlidePagePosition();
    if ($win.width() < 768) {
      $slidePageBack.trigger("click");
    } else {
      if ($slidePageTriggerActive !== null) {
        $slidePageTriggerActive.trigger("click");
      }
    }
  };

// Modal
// -------------------------------------
$modalTrigger.modal();

// 加購
// -------------------------------------
// $addon.owlCarousel({
//   itemsCustom: [
//     [0, 2],
//     [767, 2],
//     [1024, 6]
//   ],
//   responsiveBaseWidth: '.container',
//   stopOnHover: true
// });

// 別人也買
// -------------------------------------
if ($(".relativePdts .item").length <= 0) {
  $(".relativePdts").hide();
} else {
  $relativePdtsCarousel.owlCarousel({
    itemsCustom: [
      [0, 2],
      [767, 2],
      [1024, 6],
    ],
    responsiveBaseWidth: ".container",
    stopOnHover: true,
  });
}
// 商品主圖
// -------------------------------------
$sync1.owlCarousel({
  afterAction: syncPosition,
  singleItem: true,
  stopOnHover: true,
});
$sync2.owlCarousel({
  itemsCustom: [
    [0, 4],
    [767, 4],
    [1024, 4],
  ],
  pagination: false,
  afterInit: function (el) {
    el.find(".owl-item").eq(0).addClass("synced");
  },
});
$sync2.on("click", ".owl-item", function (e) {
  e.preventDefault();
  var number = $(this).data("owlItem");
  $sync1.trigger("owl.goTo", number);
});

// 加入購物車
// -------------------------------------
$CTA.on("click", function () {
  swal(
    {
      title: "Thank you!",
      text: "本商品已加入購物車。",
      type: "success",
      showCancelButton: true,
      cancelButtonText: "繼續購物",
      confirmButtonText: "立即結帳",
      closeOnConfirm: false,
    },
    function () {
      window.open("shoppingDetails.htm", "_top");
    }
  );
  return false;
});

// 加入願望清單
// -------------------------------------
$trace.on("click", function () {
  swal(
    {
      title: "Thank you!",
      text: "本商品已加入願望清單，請隨時留意商品狀態。",
      type: "info",
      showCancelButton: true,
      cancelButtonText: "繼續購物",
      confirmButtonText: "前往會員專區",
      closeOnConfirm: false,
    },
    function () {
      window.open("wishList.htm", "_top");
    }
  );
  return false;
});

// 我要發問
// -------------------------------------
$btnQuerySubmit.on("click", function () {
  swal(
    {
      title: "留言已送出！",
      text: "客服人員將儘快為您處理",
      type: "success",
    },
    function () {
      // 送出留言後，關閉留言界面
      $queryModal.trigger("click");
    }
  );
});

// 動態載入頁面
// -------------------------------------
$slidePageTrigger.on("click", function () {
  var $this = $(this);
  $header.attr("class", "header headroom");
  $body.addClass("slidePage-open");
  $slidePageTrigger.removeClass("active").filter($this).addClass("active");
  $.ajax({
    url: $this.attr("href"),
    dataType: "html",
    beforeSend: function () {
      moveSlidePagePosition();
      $slidePageTitle.text($this.text());
      $slidePageTriggerActive = $this;
    },
  })
    .done(function (data) {
      $slidePageBody.empty().append(data).scrollTop(0);
      $slidePage.addClass("active");
    })
    .fail(function (jqXHR) {
      switch (jqXHR.status) {
        case 404:
          swal("很抱歉...", "網頁連結有誤，請稍候再試！", "error");
          break;
        default:
          break;
      }
    });
  return false;
});

$slidePageBack.on("click", function () {
  $slidePageTrigger.removeClass("active");
  return false;
});

// Window resize
// -------------------------------------
$win.on("resize", winResizeHandler);

// initial
// -------------------------------------
if ($win.width() >= 768) {
  $slidePageTrigger.eq(0).trigger("click");
}
moveSlidePagePosition();

// 贈品
// -------------------------------------
var giftCarousel = null;
var giftNames = Array.prototype.slice.call(
  document.querySelectorAll(".giftName")
);
$(".giftName").modal({
  afterLoad: function (event) {
    var index = giftNames.indexOf(event.currentTarget);
    if (giftCarousel === null) {
      giftCarousel = $("#giftCarousel")
        .owlCarousel({
          autoPlay: false,
          pagination: true,
          lazyLoad: true,
          singleItem: true,
        })
        .data("owlCarousel");
    }
    giftCarousel.jumpTo(index);
  },
});
