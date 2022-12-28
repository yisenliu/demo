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
      }
    } else {
      if ($container.next().hasClass('slidePage')) {
        $slidePage.insertAfter($genre);
        // console.log('move to inside');
      }
    }
  };
var isModalReady = false;
var ytPlayer, currentVideoId, lastVideoId;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('youtubeVideo', {
    playerVars: {
      rel: 0,
      playsinline: 1,
      autoplay: 1
    },
    events: {
      onReady: function(event) {
        event.target.playVideo();
      },
      onStateChange: function(event) {
        switch (event.data) {
          case 0: // ended
            event.target.stopVideo();
            break;
          case 1: // playing
            break;
          case 2: // paused
            break;
          default:
            // unstarted,buffering,video cued
            break;
        }
      }
    }
  });
}

// 動態載入頁面
// -------------------------------------
$slidePageTrigger.on('click', function() {
  var $this = $(this);
  isModalReady = false;
  $header.attr('class', 'header headroom');
  $body.addClass('slidePage-open');
  $slidePageTrigger
    .removeClass('active')
    .filter($this)
    .addClass('active');
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
      $slidePageBody
        .empty()
        .append(data)
        .scrollTop(0);
      $slidePage.addClass('active');
      spBodyHeight = $slidePageBody.outerHeight();
      if (!isModalReady) {
        $('.tutorial').modal({
          afterLoad: function(event) {
            currentVideoId = event.currentTarget.dataset.videoId;
            if (currentVideoId === lastVideoId) {
              ytPlayer.playVideo();
            } else {
              ytPlayer.loadVideoById(currentVideoId);
            }
          },
          beforeClose: function() {
            lastVideoId = currentVideoId;
            ytPlayer.pauseVideo();
          }
        });
        isModalReady = true;
      }
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

// Window resize
// -------------------------------------
$win.on('resize', winResizeHandler);

// initial
// -------------------------------------
if (winWidth >= 768) {
  $slidePageTrigger.eq(0).trigger('click');
}
moveSlidePagePosition();
