$(document).ready(function () {
    'use strict';

    const element = document.documentElement;

    // is mobile
    const is_mobile = isMobile();
    if (is_mobile) {
        element.classList.add('is-mobile');
    }

    // reviews slider
    let $reviewsSlider = $('.reviews-slider'),
        reviewsSlider = $reviewsSlider[0];

    $reviewsSlider.slick({
        // draggable: false,
        // accessibility: false,

        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        // focusOnSelect: true,
        swipe: true,
        prevArrow: `<button class="reviews-slider__arrow reviews-slider__arrow--prev" type="button">
                        <span class="visually-hidden">Назад</span> 
                        <svg width="34" height="23" viewBox="0 0 512 341.333" fill="#c3c3c3" xmlns="http://www.w3.org/2000/svg"><path d="M3.124 178.208l160 160a10.666 10.666 0 1 0 15.084-15.083L36.416 181.335h464.917a10.667 10.667 0 1 0 0-21.335H36.416L178.208 18.208a10.665 10.665 0 1 0-15.083-15.083l-160 160a10.663 10.663 0 0 0 0 15.083z"/></svg>
                    </button>`,
        nextArrow: `<button class="reviews-slider__arrow reviews-slider__arrow--next" type="button">
                        <span class="visually-hidden">Вперед</span>  
                        <svg width="34" height="23" viewBox="0 0 512 341.3" fill="#c3c3c3" xmlns="http://www.w3.org/2000/svg"><path d="M508.9 163.1l-160-160C344.7-1 338-1 333.8 3.1c-4.2 4.2-4.2 10.9 0 15.1L475.6 160H10.7C4.8 160 0 164.8 0 170.7s4.8 10.7 10.7 10.7h464.9L333.8 323.1c-4.2 4.2-4.2 10.9 0 15.1 2.1 2.1 4.8 3.1 7.5 3.1s5.5-1 7.5-3.1l160-160c4.2-4.2 4.2-10.9.1-15.1z"/></svg>
                    </button>`,
    });

    $('.review-big-slider').on('mousedown', function(){
        reviewsSlider.slick.setOption({
            swipe: false
        });
    });

    // review big slider
    $('.review-big-slider').slick({
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.review-small-slider__wr',
        // pauseOnFocus: false,
        // pauseOnHover: false,
        // focusOnSelect: true,
        swipe: true,
        prevArrow: `<button class="review-big-slider__arrow review-big-slider__arrow--prev" type="button">
                        <span class="visually-hidden">Назад</span>  
                        <svg width="13" height="15" viewBox="0 0 448 490.7" fill="#c3c3c3" xmlns="http://www.w3.org/2000/svg"><path d="M25.8 245.3L252.9 18.2c4.2-4.2 4.2-10.9 0-15.1s-10.9-4.2-15.1 0L3.1 237.8c-4.2 4.2-4.2 10.9 0 15.1l234.7 234.7c2.1 2.1 4.8 3.1 7.6 3.1s5.5-1 7.5-3.1c4.2-4.2 4.2-10.9 0-15.1L25.8 245.3z"/><path d="M217.8 245.3L444.9 18.2c4.2-4.2 4.2-10.9 0-15.1s-10.9-4.2-15.1 0L195.1 237.8c-4.2 4.2-4.2 10.9 0 15.1l234.7 234.7c2.1 2.1 4.8 3.1 7.6 3.1s5.5-1 7.5-3.1c4.2-4.2 4.2-10.9 0-15.1L217.8 245.3z"/></svg>
                    </button>`,
        nextArrow: `<button class="review-big-slider__arrow review-big-slider__arrow--next" type="button">
                        <span class="visually-hidden">Вперед</span> 
                            <svg width="13" height="15" viewBox="0 0 447.99 490.652" fill="#c3c3c3" xmlns="http://www.w3.org/2000/svg"><path d="M422.236 245.335L195.121 472.449a10.665 10.665 0 0 0 15.083 15.083L444.87 252.865a10.674 10.674 0 0 0 0-15.083L210.203 3.115A10.716 10.716 0 0 0 202.651 0a10.562 10.562 0 0 0-7.531 3.136 10.674 10.674 0 0 0 0 15.083z"/><path d="M230.236 245.335L3.121 472.449a10.665 10.665 0 0 0 15.083 15.083L252.87 252.865a10.674 10.674 0 0 0 0-15.083L18.203 3.115A10.716 10.716 0 0 0 10.651 0 10.562 10.562 0 0 0 3.12 3.136a10.674 10.674 0 0 0 0 15.083z"/></svg>
                    </button>`,
    }).on('afterChange', function(event, slick){
        reviewsSlider.slick.setOption({
            swipe: true
        })
    });

    $('.review-small-slider__wr').on('mousedown', function(){
        reviewsSlider.slick.setOption({
            swipe: false
        });
    });

    // review small slider
    $('.review-small-slider__wr').slick({
        dots: false,
        // draggable: false,
        // accessibility: false,

        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        asNavFor: '.review-big-slider',
        pauseOnFocus: false,
        pauseOnHover: false,
        focusOnSelect: true,
        swipe: true,
        // responsive: [
        //     {
        //         breakpoint: 993,
        //         settings: {
        //             slidesToShow: 3,
        //         }
        //     },
        // ]
    }).on('afterChange', function(event, slick){
        reviewsSlider.slick.setOption({
            swipe: true
        })
    });

    // run parallax
    if (!is_mobile) {
        let scene = document.querySelectorAll('.scene');
        scene.forEach(function (sceneItem) {
            let parallaxInstance = new Parallax(sceneItem);
        });
    }

    // masked input
    $('input[type="tel"]').mask("+38 (999) 999-99-99");

    // is mobile
    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

}); // end ready
