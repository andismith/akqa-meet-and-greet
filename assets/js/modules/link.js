window.akqa = window.akqa || {};

(function(link, $, undefined) {

    var $slides = $('.slide');
    var $ctas = $('.cta');

    var handleEvents = function () {
        $('a').on('click', function(e) {
            var $el = e.target || e.srcElement;
            var $target = {};
            var timeout = 500;

            if ($el.hash.length > 1) {
                $target = $($el.hash);

                if ($target.length && $target.hasClass('slide')) {
                    e.preventDefault();
                    $slides.removeClass('active');
                    $target.addClass('active');

                    $ctas.addClass('disabled');

                    if ($el.hash !== '#who-are-you') {
                        if ($el.hash === '#team-up') {
                            timeout = 5000;
                        }

                        if ($el.hash === '#talk-to') {
                            timeout = 5000;
                        }
                        setTimeout(function() {
                            $('.active .cta').removeClass('disabled');
                        }, timeout);  
                    }
                    
                }
            }

        });
    };

    var init = function () {
        handleEvents();
        console.log('handling events');
    };

    init();

}(window.akqa.link = window.akqa.link || {}, jQuery));