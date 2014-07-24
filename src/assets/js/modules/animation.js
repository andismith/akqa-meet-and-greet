window.akqa = window.akqa || {};

(function (app, $) {

    function appear(elem) {
      console.log('show!');
      $(elem).addClass('show');
    }

    function disappear(elem) {
      console.log('hide!');
      $(elem).removeClass('show');
    }

    function scheduleAnimation() {
      console.log('schedule!');
      $('body').addClass('hide-logo');
      setTimeout(function() {
        appear('.animate-0');
      }, 1000);

      setTimeout(function() {
        disappear('.animate-0');
      }, 5000);

      setTimeout(function() {
        appear('.animate-1');
      }, 6000);
      
    }

    function initEvents() {
      console.log('initEvents!');
      $('.start-animation').on('click', scheduleAnimation);
    }

    app.init = function () {
      initEvents();
    };


})(window.akqa.animation = window.akqa.animation || {}, jQuery);

window.akqa.animation.init();