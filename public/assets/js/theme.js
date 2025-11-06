;(function($) {
    "use strict";

    const home3banner = $('.home-banner-3-logo-carousel');
    if(home3banner.length)
        home3banner.slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
            prevArrow: '<button class="slick-prev fas fa-chevron-left" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next fas fa-chevron-right" aria-label="Next" type="button">Next</button>',
        });

    if($('.portfolio-filtered-section').length)
        $('.portfolio-filtered-section').imagesLoaded( function() {
            // init Isotope
            let $grid = $('.portfolio-filter-grid').isotope({
                itemSelector: '.portfolio-3col-item',
                layoutMode: 'fitRows'
            });
            // change is-checked class on buttons
            $('.portfolio-filter-group').each( function( i, buttonGroup ) {
                let $buttonGroup = $( buttonGroup );
                $buttonGroup.on( 'click', '.filter', function() {
                    $grid.isotope({ filter: $( this ).attr('data-filter') });
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $( this ).addClass('is-checked');
                });
            });
        });

})(jQuery);
