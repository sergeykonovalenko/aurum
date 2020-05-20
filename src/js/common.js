import 'jquery-ui/ui/widgets/tabs';
import 'rater-jquery';
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
import 'waypoints/lib/noframework.waypoints.min';
import 'slick-carousel/slick/slick.min';
import Parallax from 'parallax-js';
import './vendor/jquery.mb.browser';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';
import 'jquery.maskedinput/src/jquery.maskedinput';
import 'jquery-validation';
import './svg-sprite';
import './google-maps';
/////////////////////////////////////////////
// Listbox - WAI-ARIA Authoring Practices 1.1
// import './vendor/utils';
// import './vendor/listbox';
// import './vendor/listbox-collapsible';
import './vendor/utils_listbox_listbox-collapsible';
/////////////////////////////////////////////

$(document).ready(function () {
    'use strict';
    const element = document.documentElement;

    // is mobile
    const is_mobile = isMobile();
    if (is_mobile) {
        element.classList.add('is-mobile');

        // show/hide languages
        $('.language-switch .menu-item-has-children > a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.language-switch').toggleClass('language-switch--show');
        });

        $(document).mouseup(function (e){
            let div = $('.language-switch');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                $('.language-switch').removeClass('language-switch--show');
            }
        });
    }

    // init modal
    $('.btn-modal').fancybox({
        touch : false,
        backFocus : false,
        btnTpl: {
            smallBtn: `
                <button class="common-modal__close fancybox-button fancybox-close-small" type="button" data-fancybox-close title="Закрыть">
                    <svg width="15" height="15" viewBox="0 0 320 320" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 160L315.3 52.3c6.2-6.2 6.2-16.3 0-22.6l-25-25c-6.2-6.2-16.3-6.2-22.6 0L160 112.4 52.3 4.7c-6.2-6.2-16.3-6.2-22.6 0l-25 25c-6.2 6.2-6.2 16.3 0 22.6L112.4 160 4.7 267.7c-6.2 6.2-6.2 16.3 0 22.6l25 25c6.2 6.2 16.3 6.2 22.6 0L160 207.6l107.7 107.7c6.2 6.2 16.3 6.2 22.6 0l25-25c6.2-6.2 6.2-16.3 0-22.6L207.6 160z"/></svg>
                </button>`
        },
        afterLoad: function( instance, slide ) {
            // Вручную обновить позиционирование слайдеров внутри
            $('.product-gallery').slick('setPosition');
            $('.product-gallery-side__wr').slick('setPosition');
        }
    });

    // smooth page scrolling
    $('.scrollto').click(function () {
        let elementClick = '#' + $(this).attr('href').split('#')[1];
        let destination = $(elementClick).offset().top;
        jQuery('html:not(:animated),body:not(:animated)').animate({scrollTop: destination - 50}, 800);
        return false;
    });

    // sticky menu
    let mainHeader = document.querySelector('.main-header');
    let mainHeaderWrapper = document.querySelector('.main-header__wr');
    let waypointOffset = 50;

    if (mainHeaderWrapper) {
        let waypoint = new Waypoint({
            element: mainHeader,
            handler: function (direction) {
                if (direction === 'down') {
                    mainHeader.style.height = mainHeaderWrapper.offsetHeight + 'px';
                    mainHeaderWrapper.classList.add('main-header__wr--sticky');
                    mainHeaderWrapper.classList.remove('main-header__wr--end-sticky');
                } else {
                    mainHeader.style.height = 'auto';
                    mainHeaderWrapper.classList.remove('main-header__wr--sticky');
                    mainHeaderWrapper.classList.add('main-header__wr--end-sticky');
                }
            },
            offset: function() {
                return -(this.element.clientHeight + waypointOffset);
            }
        });
    }

    // Show/hide mobile menu
    $('.main-header__hamburger').on('click', function () {
        $('html').toggleClass('show-mobile-menu');
    });

    $('.mobile-menu__close, .mobile-menu__list a, .mobile-menu__logo').on('click', function () {
        $('html').removeClass('show-mobile-menu');
    });

    // reviews slider
    let $reviewsSlider = $('.reviews-slider'),
        reviewsSlider = $reviewsSlider[0];

    $reviewsSlider.slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        // focusOnSelect: true,
        adaptiveHeight: true,
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

    $('.review-big-slider').on('mousedown touchstart', function(){
        reviewsSlider.slick.setOption({
            swipe: false,
        });
    });

    // review big slider
    $('.review-big-slider').slick({
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.review-small-slider__wr',
        pauseOnFocus: false,
        pauseOnHover: false,
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
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }).on('afterChange', function(event, slick){
        reviewsSlider.slick.setOption({
            swipe: true
        })
    });

    $('.review-small-slider__wr').on('mousedown touchstart', function(){
        reviewsSlider.slick.setOption({
            swipe: false
        });
    });

    // review small slider
    $('.review-small-slider__wr').slick({
        dots: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        asNavFor: '.review-big-slider',
        pauseOnFocus: false,
        pauseOnHover: false,
        focusOnSelect: true,
        swipe: true,
    }).on('afterChange', function(event, slick){
        reviewsSlider.slick.setOption({
            swipe: true
        })
    });

    // news slider
    $('.news-slider__wr').slick({
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        pauseOnFocus: false,
        pauseOnHover: false,
        // focusOnSelect: true,
        prevArrow: `<button class="news-slider__arrow news-slider__arrow--prev" type="button">
                        <span class="visually-hidden">Назад</span>
                        <svg width="34" height="23" viewBox="0 0 512 341.333" fill="#c3c3c3" xmlns="http://www.w3.org/2000/svg"><path d="M3.124 178.208l160 160a10.666 10.666 0 1 0 15.084-15.083L36.416 181.335h464.917a10.667 10.667 0 1 0 0-21.335H36.416L178.208 18.208a10.665 10.665 0 1 0-15.083-15.083l-160 160a10.663 10.663 0 0 0 0 15.083z"/></svg>
                    </button>`,
        nextArrow: `<button class="news-slider__arrow news-slider__arrow--next" type="button">
                        <span class="visually-hidden">Вперед</span>
                        <svg width="34" height="23" viewBox="0 0 512 341.3" fill="#c3c3c3" xmlns="http://www.w3.org/2000/svg"><path d="M508.9 163.1l-160-160C344.7-1 338-1 333.8 3.1c-4.2 4.2-4.2 10.9 0 15.1L475.6 160H10.7C4.8 160 0 164.8 0 170.7s4.8 10.7 10.7 10.7h464.9L333.8 323.1c-4.2 4.2-4.2 10.9 0 15.1 2.1 2.1 4.8 3.1 7.5 3.1s5.5-1 7.5-3.1l160-160c4.2-4.2 4.2-10.9.1-15.1z"/></svg>
                    </button>`,
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });

    // slider product gallery
    $('.product-gallery').slick({
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-gallery-side__wr',
        pauseOnFocus: false,
        pauseOnHover: false,
        // focusOnSelect: true,
    });

    // slider product gallery side
    $('.product-gallery-side__wr').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        asNavFor: '.product-gallery',
        pauseOnFocus: false,
        pauseOnHover: false,
        focusOnSelect: true,
        prevArrow: `<button class="product-gallery-side__arrow product-gallery-side__arrow--prev" type="button">
                        <span class="visually-hidden">Назад</span>
                        <svg width="14" viewBox="0 0 149 256.1" fill="#999999" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 119.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L43.1 128l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L3.4 136.5c-4.6-4.7-4.6-12.3.1-17z"/></svg>
                    </button>`,
        nextArrow: `<button class="product-gallery-side__arrow product-gallery-side__arrow--next" type="button">
                        <span class="visually-hidden">Вперед</span>
                        <svg width="14" viewBox="0 0 149 256.1" fill="#999999" xmlns="http://www.w3.org/2000/svg"><path d="M145.4 136.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L105.8 128 3.6 27.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg>
                    </button>`,
    });

    ////////////////////////////////////////////////////////////////////////////
    // Send callback / Send request / Buy product
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Пожалуйста, проверьте свои данные",
    );

    function valEl(el) {
        let validator = el.validate({
            rules:{
                'phone': {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                'email': {
                    required: true,
                    email: true
                },
            },
            messages:{
                'phone': '',
                'email': {
                    required: '',
                    email: ''
                },
            },
            submitHandler: function (form) {

                let submitBtn = $(form).find('button');
                let submitBtnText = submitBtn.html();

                // get url for redirection
                let redirect_url = $(form).find('#redirect_url').val();

                $.ajax({
                    url: '/sys-send-request/',
                    data: new FormData(form),
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    beforeSend: function() {
                        submitBtn.prop('disabled', true).html('Отправка...');
                    },
                    success: function (data) {

                        // enable button
                        submitBtn.prop('disabled', false).html(submitBtnText);

                        if ( data == '1' ) {

                            if ( redirect_url ) { // if need redirect
                                window.location.replace( redirect_url );
                            }

                            $.fancybox.open({
                                src: `<div class="modal-thanks modal-common">
                                          <h4 class="modal-thanks__title">Спасибо, за Ваше обращение. Мы свяжемся с Вами в скором времени</h4>
                                      </div>`,
                                type : 'html',
                                touch : false,
                                btnTpl: {
                                    smallBtn: `
                                        <button class="modal-common__close fancybox-button fancybox-close-small" type="button" data-fancybox-close title="Закрыть">
                                            <svg width="15" height="15" viewBox="0 0 320 320" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 160L315.3 52.3c6.2-6.2 6.2-16.3 0-22.6l-25-25c-6.2-6.2-16.3-6.2-22.6 0L160 112.4 52.3 4.7c-6.2-6.2-16.3-6.2-22.6 0l-25 25c-6.2 6.2-6.2 16.3 0 22.6L112.4 160 4.7 267.7c-6.2 6.2-6.2 16.3 0 22.6l25 25c6.2 6.2 16.3 6.2 22.6 0L160 207.6l107.7 107.7c6.2 6.2 16.3 6.2 22.6 0l25-25c6.2-6.2 6.2-16.3 0-22.6L207.6 160z"/></svg>
                                        </button>`
                                },
                                afterClose: function () {
                                    $.fancybox.close();
                                }
                            });
                            jQuery(form).find('.form__field').each(function(){ jQuery(this).val(''); });

                        } else {
                            $.fancybox.open({
                                src: `<div class="modal-thanks modal-common">
                                          <h4 class="modal-thanks__title">Произошла ошибка при отправке заявки. Повторите отправку или перезвоните нам!</h4>
                                      </div>`,
                                type : 'html',
                                touch : false,
                                btnTpl: {
                                    smallBtn: `
                                        <button class="modal-common__close fancybox-button fancybox-close-small" type="button" data-fancybox-close title="Закрыть">
                                            <svg width="15" height="15" viewBox="0 0 320 320" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 160L315.3 52.3c6.2-6.2 6.2-16.3 0-22.6l-25-25c-6.2-6.2-16.3-6.2-22.6 0L160 112.4 52.3 4.7c-6.2-6.2-16.3-6.2-22.6 0l-25 25c-6.2 6.2-6.2 16.3 0 22.6L112.4 160 4.7 267.7c-6.2 6.2-6.2 16.3 0 22.6l25 25c6.2 6.2 16.3 6.2 22.6 0L160 207.6l107.7 107.7c6.2 6.2 16.3 6.2 22.6 0l25-25c6.2-6.2 6.2-16.3 0-22.6L207.6 160z"/></svg>
                                        </button>`
                                },
                                afterClose: function () {
                                    $.fancybox.close();
                                }
                            });
                        }
                    }
                });

                return false;
            }
        });
    }

    $('.js-form').each(function() {
        valEl( $(this) );
    });
    ////////////////////////////////////////////////////////////////////////////

    // show/hide dealers
    $('.dealers__btn-show-all').on('click', function () {
        $('.dealers').toggleClass('dealers--all-shown');
    });

    // run parallax
    if (!is_mobile) {
        let scene = document.querySelectorAll('.scene');
        scene.forEach(function (sceneItem) {
            let parallaxInstance = new Parallax(sceneItem);
        });
    }

    // show/hide dropdown
    $('.dropdown__button').on('click', function () {
        let dropdownItems = $('.dropdown__item');
        let currentDropdownItem = $(this).closest('.dropdown__item');

        dropdownItems.not(currentDropdownItem).removeClass('dropdown__item--open');
        currentDropdownItem.toggleClass('dropdown__item--open');
    });

    $('.parameters__button').on('click', function () {
        $('.dropdown__item').removeClass('dropdown__item--open');
    });

    $(document).mouseup(function (e) {
        let div = $('.dropdown__item--open');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.dropdown__item').removeClass('dropdown__item--open');
        }
    });

    // show/hide callouts image
    $('.callouts__item').on('click', function () {
        $('.callouts__item').not($(this)).removeClass('callouts__item--open');
        $(this).toggleClass('callouts__item--open');
    });

    $(document).mouseup(function (e){
        let div = $('.callouts__item--open');
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.callouts__item').removeClass('callouts__item--open');
        }
    });

    // get the width of the scrollbar
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");

    // custom scroller
    $('.js-custom-scroller-dark-y').mCustomScrollbar({
        theme: 'dark',
        scrollButtons: { enable: true }
    });

    $('.js-custom-scroller-dark-x').mCustomScrollbar({
        theme: 'dark',
        axis: 'x',
        scrollButtons: { enable: true }
    });

    $('.js-custom-scroller-light-y').mCustomScrollbar({
        theme: 'light',
        scrollButtons: { enable: true }
    });

    // init tabs
    $('.product-types-tabs').tabs({
        active: 0,
        activate: function( event, ui ) {
            $('.product-gallery').slick('setPosition');
            $('.product-gallery-side__wr').slick('setPosition');
        }
    });

    $('.product-tabs').tabs({
        active: 0,
    });

    // rating
    let options = {
        max_value: 5,
        step_size: 0.5,
        initial_value: 0,
        selected_symbol_type: 'utf8_star', // Must be a key from symbols
        cursor: 'default',
        readonly: true,
        change_once: false, // Determines if the rating can only be set once
        ajax_method: 'POST',
        // url: 'http://localhost/test.php',
        // additional_data: {} // Additional data to send to the server
    };

    $('.js-rating--read-only--true').rate(options);
    options.readonly = false;
    $('.js-rating--read-only--false').rate(options);

    // masked input
    $('input[type="tel"]').mask('+38 (999) 999-99-99');

    // is mobile
    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

}); // end ready
