// image id delimiter
const IMG_ID_DELIMITER = '-thumb';

// carousel parms
const OPACITY_DELTA = 0.01;
const TIMER_DELAY = 15;
const TRANSITION_DURATION_SECONDS = TIMER_DELAY / OPACITY_DELTA / 1000;

// all the main images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;

// all the thumbnail images
const thumbnailElements = document.querySelectorAll('div#thumbnails img');

// show the first main image
let imgCurrent = document.querySelector('div#carousel img:first-child');
imgCurrent.style.opacity = 1;

// click event listener for thumbnail images
for (let thumbnailElement of thumbnailElements) {

    thumbnailElement.addEventListener('click', evt => {

        // relationship of ids of thumbnails and main images
        // id of thumbnail is "<img-name>-thumb", of main image is "<img-name>"

        // clicked thumbnail image
        const thumbClicked = evt.currentTarget;
        const thumbIdClicked = thumbClicked.getAttribute('id');

        // corresponding main image
        const imgId = thumbIdClicked.split(IMG_ID_DELIMITER)[0];
        const imgNext = document.getElementById(imgId);

        // main image of clicked thumbnail different from current main image
        if (imgNext != imgCurrent) {

            // disable clicks on all thumbnails
            for (let thumbnail of thumbnailElements) {
                thumbnail.style.pointerEvents = 'none';
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

                    // set final opacities
                    clearInterval(timerId);
                    imgCurrent.style.opacity = 0;
                    imgNext.style.opacity = 1;
                    imgCurrent = imgNext;

                    // re-enable clicks on all thumbnails
                    for (let thumbnail of thumbnailElements) {
                        thumbnail.style.pointerEvents = 'auto';
                    }
                }   // fading complete

            }, TIMER_DELAY);
        }       // user clicks a different thumbnail
    });     // click event listener for thumbnails
}   // for each thumbnail
