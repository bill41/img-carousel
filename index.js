// carousel parms
const IMG_WIDTH = 260;
const SLIDE_INCREMENT_PX = 2;
const TIMER_DELAY = 7;
const TRANSITION_DURATION_SECONDS =
    (IMG_WIDTH / SLIDE_INCREMENT_PX) * TIMER_DELAY / 1000;

// button ids
const BTN_NEXT_ID = 'btn-next';
const BTN_PREV_ID = 'btn-prev';

// all the images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;
let idx = 0;

// initialize image positions
for (let i = 0; i < numImages; i++) {
    imgElements[i].style.left = i * IMG_WIDTH + 'px';
}

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
        let leftCurrent = 0;
        let leftFinalCurrent;
        let leftNext;
        if (btnClicked.id == BTN_NEXT_ID) {   
            imgCurrent =
                document.querySelector(`div#carousel img:nth-child(n + ${idx + 1})`);
            if (idx == numImages - 1) idx = -1;
            imgNext =
                document.querySelector(`div#carousel img:nth-child(n + ${idx + 2})`);
            idx += 1;
            leftNext = IMG_WIDTH;
            leftFinalCurrent = -IMG_WIDTH;
        } else if (btnClicked.id == BTN_PREV_ID) {
            imgCurrent =
                document.querySelector(`div#carousel img:nth-child(n + ${idx + 1})`);
            if (idx == 0) idx = numImages;
            imgNext =
                document.querySelector(`div#carousel img:nth-child(n + ${idx})`);
            idx -= 1;
            leftNext = -IMG_WIDTH;
            leftFinalCurrent = IMG_WIDTH;
        }
    
        // initialize positions of current and next images
        imgCurrent.style.left = leftCurrent + 'px';
        imgNext.style.left = leftNext + 'px';

        // slide out current image, slide in next image
        const timerId = setInterval(() => {

            // do the transition
            if (btnClicked.id == BTN_NEXT_ID) {
                leftCurrent -= SLIDE_INCREMENT_PX;
                leftNext -= SLIDE_INCREMENT_PX;
            } else if (btnClicked.id == BTN_PREV_ID) {
                leftCurrent += SLIDE_INCREMENT_PX;
                leftNext += SLIDE_INCREMENT_PX;
            }
            imgNext.style.left = leftNext + 'px';
            imgCurrent.style.left = leftCurrent + 'px';

            // sliding complete
            if (leftNext == 0) {

                // clear timer and set final positions
                clearTimeout(timerId);
                imgNext.style.left = 0 + 'px';
                imgCurrent.style.left = leftFinalCurrent + 'px';

                // re-enable buttons
                for (let btn of btnElements) {
                    btn.removeAttribute('disabled')
                }
            }       // sliding complete
        }, TIMER_DELAY);    // setInterval
    });     // event listener for buttons
}   // for each button
