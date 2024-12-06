// carousel parms
const OPACITY_DELTA = 0.01;
const TIMER_DELAY = 15;
const TRANSITION_DURATION_SECONDS = TIMER_DELAY / OPACITY_DELTA / 1000;

// button ids
const BTN_NEXT_ID = 'btn-next';
const BTN_PREV_ID = 'btn-prev';

// all the images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;
let idx = 0;

// show the first image
const imgFirst = document.querySelector('div#carousel img:first-child');
imgFirst.style.opacity = 1;

// click event listener for the buttons
const btnElements = document.querySelectorAll('div#controls button');
for (btnElement of btnElements) {

    btnElement.addEventListener('click', evt => {

        // disable buttons
        for (let btn of btnElements) {
            btn.setAttribute('disabled', 'disabled');
        }

        // get clicked button
        const btnClicked = evt.currentTarget;

        // determine current and next images
        let imgCurrent;
        let imgNext;
        if (btnClicked.id == BTN_NEXT_ID) {   
            imgCurrent =
                document.querySelector(`div#carousel img:nth-child(n + ${idx + 1})`);
            if (idx == numImages - 1) idx = -1;
            imgNext =
                document.querySelector(`div#carousel img:nth-child(n + ${idx + 2})`);
            idx += 1;
        } else if (btnClicked.id == BTN_PREV_ID) {
            imgCurrent =
                document.querySelector(`div#carousel img:nth-child(n + ${idx + 1})`);
            if (idx == 0) idx = numImages;
            imgNext =
                document.querySelector(`div#carousel img:nth-child(n + ${idx})`);
            idx -= 1;
        }
    
        // initialize opacities of current and next images
        let opacityCurrent = 1;
        let opacityNext = 0;
        imgCurrent.style.opacity = opacityCurrent;
        imgNext.style.opacity = opacityNext;

        // fade out current image, fade in next image
        const timerId = setInterval(() => {

            // do the transition
            opacityCurrent -= OPACITY_DELTA;
            opacityNext += OPACITY_DELTA;
            imgCurrent.style.opacity = opacityCurrent;
            imgNext.style.opacity = opacityNext;

            // fading complete
            if (imgNext.style.opacity >= 1) {

                // clear timer and set final opacities
                clearTimeout(timerId);
                imgCurrent.style.opacity = 0;
                imgNext.style.opacity = 1;

                // re-enable buttons
                for (let btn of btnElements) {
                    btn.removeAttribute('disabled')
                }
            }
        }, TIMER_DELAY);     // setInterval
    });     // event listener for buttons
}   // for each button
