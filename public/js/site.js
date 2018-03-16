// Global Variables (Scary)
let navOpen = false;

//Wait for DOM load!
$.when( $.ready ).then(function() {

    // // Nav Click Handler
    $('.hamburger-buttongroup').click(
        () => {
            if (navOpen === false) {
                $('.nav-contents').addClass('nav-contents-open');
                $('.hamburger-button').addClass('hamburger-button-open');
                navOpen = true;
            } else {
                $('.nav-contents').removeClass('nav-contents-open');
                $('.hamburger-button').removeClass('hamburger-button-open');
                navOpen = false;
            }

        }
    );
    if (window.location.pathname === '/') {
        let lottie = bodymovin.loadAnimation({
            container:  document.getElementById('line-animation'), // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: ('./lottie-files/fun-line.json')  // the path to the animation json
        });
    }

});
