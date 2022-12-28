"use strict";
var $btnSubmitOrder = $(".callToAction .btn--primary");
var $eye = $(".eye");
var $invoiceType = $(".invoice-2, .invoice-3, .invoice-donate");
var $invoiceRel = $("div[rel^=invoice]");
var $interactiveLabel = $(
  "div[rel=invoice-2] .radio > label,div[rel=payByCreditCard] .radio > label"
);
var $modalTrigger = $(".fromAddressee, .tss");
var $root = $("html");
var $payByType = $('input[name="howToPay"]');
var $payByRel = $("div[rel^=payBy]");
var $pickUpByType = $('input[name="howToPickUp"]');
var $pickUpByRel = $("div[rel^=pickUpBy]");
var $addresseeModal = $("#addresseeModal");

// 密碼顯示或隱藏
$eye.on("click", function () {
  var $this = $(this);
  $this.toggleClass("eye-open");
  if ($this.hasClass("eye-open")) {
    $this.siblings(".form-control").attr("type", "text");
  } else {
    $this.siblings(".form-control").attr("type", "password");
  }
});

// 選擇送貨方式
$pickUpByType.on("change", function () {
  var $this = $(this),
    relValue = null;

  if ($this.prop("checked")) {
    relValue = $this.data("rel");
    $pickUpByRel
      .removeClass("active")
      .slideUp(200)
      .filter(function () {
        if ($(this).attr("rel") === relValue) {
          return true;
        }
      })
      .addClass("active")
      .slideDown(200);
  }
});

// 選擇付款方式
$payByType.on("change", function () {
  var $this = $(this),
    relValue = null;

  if ($this.prop("checked")) {
    relValue = $this.data("rel");
    $payByRel
      .removeClass("active")
      .slideUp(200)
      .filter(function () {
        if ($(this).attr("rel") === relValue) {
          return true;
        }
      })
      .addClass("active")
      .slideDown(200);
  }
});

// 發票形式
$invoiceType.on("change", function () {
  var $this = $(this),
    relValue = null;

  if ($this.prop("checked")) {
    relValue = $this.data("rel");
    $invoiceRel
      .removeClass("active")
      .slideUp(200)
      .filter(function () {
        if ($(this).attr("rel") === relValue) {
          return true;
        }
      })
      .addClass("active")
      .slideDown(200);
  }
});

$interactiveLabel.on("change", function () {
  var $this = $(this),
    $activeFormGroup = $this.closest(".form-group"),
    $siblingFormGroups = $activeFormGroup.siblings(".form-group");

  if (!$activeFormGroup.hasClass("active")) {
    $siblingFormGroups
      .filter(function () {
        if (!$(this).hasClass("issuingBank")) {
          return true;
        }
      })
      .removeClass("active")
      .find(".form-control")
      .prop("disabled", true);
    $root.stop().animate(
      {
        scrollTop: $activeFormGroup.offset().top - 100,
      },
      400,
      function () {
        $activeFormGroup
          .addClass("active")
          .find(".form-control")
          .prop("disabled", false)
          .eq(0)
          .trigger("focus");
      }
    );
  }
});

// 送出訂單
// -------------------------------------
$btnSubmitOrder.on("click", function () {
  window.open("orderDone.htm", "_top");
});

// 購物流程標示
// -------------------------------------
$(".flows").addClass("step2");

// Modal
// -------------------------------------
$modalTrigger.modal();
$(".select").on("click", function () {
  // 選擇後，自動關閉modal
  $addresseeModal.trigger("click");
});

// 範例圖片
// -------------------------------------
$(".sampleImg").on("click", function (e) {
  $(this).toggleClass("active");
  return false;
});
