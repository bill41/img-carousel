// carousel parms
const OPACITY_DELTA = 0.01;
const TIMER_DELAY_FADE = 15;
const TIMER_DELAY_NEXT_IMG = 5000;

// all the images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;

// show the first image
let imgFirst = document.querySelector('div#carousel img:first-child');
imgFirst.style.opacity = 1;
let imgCurrent = imgFirst;

// transition to next image
const timerIdNextImg = setInterval(() => {

    // get next image
    let imgNext = imgCurrent.nextElementSibling;
    if (!imgNext) {
        imgNext = imgFirst;
    }

    // initialize opacities of current and next images
    let opacityCurrent = 1;
    let opacityNext = 0;
    imgCurrent.style.opacity = opacityCurrent;
    imgNext.style.opacity = opacityNext;

    // fade out current image, fade in next image
    const timerIdFade = setInterval(() => {

        // do the transition
        opacityCurrent -= OPACITY_DELTA;
        opacityNext += OPACITY_DELTA;
        imgCurrent.style.opacity = opacityCurrent;
        imgNext.style.opacity = opacityNext;

        // fading complete
        if (imgNext.style.opacity >= 1) {

            // set final opacities
            clearInterval(timerIdFade);
            imgCurrent.style.opacity = 0;
            imgNext.style.opacity = 1;
            imgCurrent = imgNext;

        }   // fading complete

    }, TIMER_DELAY_FADE);    // fade timer
}, TIMER_DELAY_NEXT_IMG);     // next image timer
