$(document).ready(function () {
    'use strict';

    const element = document.documentElement;

    // is mobile
    const is_mobile = isMobile();
    if (is_mobile) {
        element.classList.add('is-mobile');
    }

    // run parallax
    if (!is_mobile) {
        let scene = document.querySelectorAll('.scene');
        scene.forEach(function (sceneItem) {
            let parallaxInstance = new Parallax(sceneItem);
        });
    }

    // is mobile
    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

}); // end ready
