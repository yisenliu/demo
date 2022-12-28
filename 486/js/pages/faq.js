'use strict';
var $body = $('body'),
  $container = $('.container'),
  $header = $('.header'),
  $slidePageTrigger = $('.slidePage-trigger'),
  $slidePage = $('.slidePage'),
  $slidePageBody = $slidePage.children('.slidePage-body'),
  $slidePageBack = $slidePage.find('.slidePage-back'),
  $slidePageTitle = $slidePage.find('.slidePage-head-middle'),
  $slidePageTriggerActive = null,
  $genre = $('.genre'),
  $win = $(window),
  spBodyHeight = 0,
  winWidth = $win.width(),
  winResizeHandler = function() {
    winWidth = $win.width();
    moveSlidePagePosition();
    if (winWidth < 768) {
      $slidePageBack.trigger('click');
    } else {
      if ($slidePageTriggerActive !== null) {
        $slidePageTriggerActive.trigger('click');
      }
    }
  },
  moveSlidePagePosition = function() {
    if (winWidth < 768) {
      if (!$container.next().hasClass('slidePage')) {
        $slidePage.insertAfter($container);
        // console.log('move to root');
      };
    } else {
      if ($container.next().hasClass('slidePage')) {
        $slidePage.insertAfter($genre);
        // console.log('move to inside');
      }
    }
  };


// 動態載入頁面
// -------------------------------------
$slidePageTrigger.on('click', function() {
  var $this = $(this);
  $header.attr('class', 'header headroom');
  $body.addClass('slidePage-open');
  $slidePageTrigger.removeClass('active').filter($this).addClass('active');
  $.ajax({
      url: $this.attr('href'),
      dataType: 'html',
      beforeSend: function() {
        moveSlidePagePosition();
        $slidePageTitle.text($this.text());
        $slidePageTriggerActive = $this;
      }
    })
    .done(function(data) {
      $slidePageBody.empty().append(data).scrollTop(0);
      $slidePage.addClass('active');
      spBodyHeight = $slidePageBody.outerHeight();
    })
    .fail(function(jqXHR) {
      switch (jqXHR.status) {
        case 404:
          swal('很抱歉...', '網頁連結有誤，請稍候再試！', 'error');
          break;
        default:
          break;
      }
    });
  return false;
});

$slidePageBack.on('click', function() {
  $slidePageTrigger.removeClass('active');
  return false;
});


// FAQ
// -------------------------------------
$slidePageBody.on('click', '.qaBlock-q', function() {
  var $qTarget = $(this);

  $qTarget.toggleClass('active').next('.qaBlock-a').slideToggle(200, function() {
    var $aTarget = $(this),
      posY, pos1, pos2,
      delta = $aTarget.position().top + $aTarget.outerHeight() - spBodyHeight;

    if (winWidth < 768 && $qTarget.hasClass('active') && delta > 0) {
      pos1 = $slidePageBody.scrollTop() + delta;
      pos2 = $slidePageBody.scrollTop() + $qTarget.position().top;
      posY = (pos1 < pos2) ? pos1 : pos2;
      $slidePageBody.stop().animate({
        scrollTop: posY
      }, 300);
    }
  });
});


// Window resize
// -------------------------------------
$win.on('resize', winResizeHandler);


// initial
// -------------------------------------
if (winWidth >= 768) {
  $slidePageTrigger.eq(0).trigger('click');
}
moveSlidePagePosition();
