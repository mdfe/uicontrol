define(function (require, exports, module) {
  var datePickerTpl = {};

  datePickerTpl.double = '<div class="daterangepicker dropdown-menu">' +
      '<div class="calendar left">' +
        '<div class="daterangepicker_input">' + _l('开始日期') + '</div>' +
        '<div class="calendar-table"></div>' +
      '</div>' +
      '<div class="calendar right">' +
         '<div class="daterangepicker_input">' + _l('结束日期') + '</div>' +
        '<div class="calendar-table"></div>' +
      '</div>' +
      '<div class="ranges">' +
        '<div class="range_inputs">' +
            '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
            '<button class="cancelBtn" type="button"></button>' +
        '</div>' +
      '</div>' +
  '</div>';

  datePickerTpl.single = function (hasTime) {
    return '<div class="daterangepicker dropdown-menu">' +
      '<div class="calendar left">' +
        '<div class="calendar-table"></div>' +
        '<div class="calendar-time ' + (hasTime ? '' : 'Hidden') + '">时间 <div></div></div>' +
        '<div class="ranges">' +
          '<div class="range_inputs">' +
            '<button class="cancelBtn singleDatePicker" type="button"></button>' +
            '<button class="applyBtn singleDatePicker" disabled="disabled" type="button"></button> ' +
          '</div>' +
        '</div>' +
      '</div>' +
  '</div>';
  };

  module.exports = datePickerTpl;
});
