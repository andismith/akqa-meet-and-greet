window.akqa = window.akqa || {};

(function (app, $) {

  var $body = $('body');

  var employees = [
    "Ajoy Roy-Chowdhury", // here
    "Amber Davies", // here
    "Anthony Grace", // here
    "Anthony Lui", // here
    "Ben Carpenter", // here
    "Ben Simpson", // here
    "Carolyn Mangan", // here
    "Cheryl Kitson", // here
    "Claire Lidstone", // here
    "Eva Leluel", // accepted
    "Facundo Yacuzzi", // here
    "Gonzalo Ocio", // accepted
    "Hanna Apperley", // here
    "Jakes Lamprecht", // here
    "Jennifer Prakash", // here
    "Jessica Roberts", // accepted
    "Joanna Lowe", // here
    "Jourik Migom", // here
    "Kevwe Okiti", // here
    "Khayam Mirza", // here
    "Mike Pires",
    "Nick Turner", // here
    "Nicole Jimenez", // here
    "Pete White", // here
    "Rebecca Godfrey", // here
    "Richard Fenn", // here
    "Russell Davies", // here
    "Sunil Mohan", // here
    "Tim Bedwell", // here
    "Vamsi Vendra"
  ];

  var GROUP_NUM = 3;

  var selected = {
    group: 0,
    num: 0
  };

  var groups = [];

  function populateDropDown() {
    var html = '';

    console.log('populate!');

    for (var i = 0, l = groups.length; i < l; i++) {
      for (var j = 0, l2 = groups[i].length; j < l2; j++) {
        html += '<option value="' + i + '-' + j + '">' + groups[i][j] + '</option>';
      }
    }

    $('.employees').append(html);
  }

  function splitArray(a, n) {
    var i = 0;
    var len = a.length;
    var out = [];
    var size = 0;
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
    return out;
  }

  function populateNames() {
    var names = [];
    var html = '';
    
    for (var i = 0, l = groups.length; i < l; i++) {
      if (groups[i].length > selected.num) {
        names.push(groups[i][selected.num]);
      } else {
        //??
      }
    }

    for (i = 0, l = names.length; i < l; i++) {
      html += names[i];

      if (i !== l - 1) {
        html += '<span> + </span>';
      }
    }

    $('.names').html(html);
  }

  function addClassToBody() {
    for (var i = 0, l = groups.length; i < l; i++) {
      $body.removeClass('group-' + i);
    }
    $body.addClass('group-' + selected.group);
    $('.screen-num .group-' + selected.group).css('display', 'block');
    $(window).scrollTop(0);
  }

  function allowNext() {
    $('#who-are-you .cta').removeClass('disabled');
  }

  function initEvent() {
    $('.employees').on('change', function () {
      var value = $(this).val();
      selected.group = value.substr(0, value.indexOf('-'));
      selected.num = value.substr(value.indexOf('-') + 1);

      $('#who-are-you h2').html('Hi ' + $('.employees option:selected').text().split(' ')[0]);

      populateNames();
      addClassToBody();
      allowNext();
    });
  }

  app.init = function () {
    groups = splitArray(employees, GROUP_NUM);
    console.log(groups);

    $body.css({
      height: $(window).height()
    });
    $('.slide').css({
      height: $(window).height()
    });

    setTimeout(function() {
      $('#welcome').addClass('show');
    }, 1250);

    setTimeout(function() {
      $body.removeClass('hide-logo');
    }, 500);

    initEvent();
    populateDropDown();
  };

})(window.akqa.group3 = window.akqa.group3 || {}, jQuery);

window.akqa.group3.init();