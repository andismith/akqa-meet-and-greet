window.akqa = window.akqa || {};

(function(link, $, undefined) {

    var $slides = $('.slide');

    var handleEvents = function () {
        $('a').on('click', function(e) {
            var $el = e.target || e.srcElement;
            var $target = {};
            console.log('click event');

            if ($el.hash.length > 1) {
                $target = $($el.hash);
                console.log('internal target');

                if ($target.length && $target.hasClass('slide')) {
                    e.preventDefault();
                    console.log('ok, has class');
                    $slides.removeClass('active');
                    $target.addClass('active');
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