(function () {

  var $a = [];
  var $el = {};
  var i = 0;
  var l = 0;

  var makeClickHandler = function () {
    return function(e) {
      sendEvent(e);
    };
  };

  var sendEvent = function (e) {
    var action;
    var category;
    var href;
    var label;
    var $el;

    $el = event.target || event.srcElement;

    category = $el.getAttribute('data-category');
    action = $el.getAttribute('data-action');
    label = $el.getAttribute('data-label') || '';
    href = $el.href;

    if (ga) {
      e.preventDefault();

      ga('send', {
        'hitType': 'event',
        'eventCategory': category,
        'eventAction': action,
        'eventLabel': label,
        'hitCallback': function() {
          window.location = href;
        }
      });
    }
  };

  $a = document.getElementsByTagName('a');
  l = $a.length;

  for (i = 0; i < l; i++) {
    $el = $a[i];

    if ($el.getAttribute('data-category')) {
      $el.onclick = makeClickHandler();
    }
  }

}());