'use strict';
/* datepicker: https://github.com/fengyuanchen/datepicker*/
var $dateFrom = $('.dateFrom'),
  $dateEnd = $('.dateEnd'),
  today = new Date();

if ($.browser.desktop && !$.browser.webkit && !$.browser.edge) {
  $.fn.datepicker.languages['zh-TW'] = {
    format: 'yyyy-mm-dd',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekStart: 0,
    startView: 0,
    yearFirst: true,
    yearSuffix: '年'
  };

  $.fn.datepicker.setDefaults({
    language: 'zh-TW'
  });

  $dateFrom.datepicker({
    setDate: today,
    startDate: new Date(today.getFullYear(), today.getMonth() - 2, today.getDate()),
    endDate: today,
    show: function () {
      $dateFrom.datepicker('setEndDate', $dateEnd.datepicker('getDate'));
    },
    pick: function (e) {
      $dateEnd.datepicker('setStartDate', e.data);
    }
  });

  $dateEnd.datepicker({
    setDate: today,
    startDate: new Date(today.getFullYear(), today.getMonth() - 2, today.getDate()),
    endDate: today,
    show: function () {
      $dateEnd.datepicker('setStartDate', $dateFrom.datepicker('getDate'));
    },
    pick: function (e) {
      $dateFrom.datepicker('setEndDate', e.data);
    }
  });
}

// toggle 商品清單
$('.toggleItems').on('click', function () {
  $(this).siblings('.items').slideToggle(200);
});
