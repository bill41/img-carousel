// image id delimiter
const IMG_ID_DELIMITER = '-thumb';

// carousel parms
const IMG_WIDTH = 260;
const SLIDE_DELTA = 2;
const TIMER_DELAY = 7;
const TRANSITION_DURATION_SECONDS = (IMG_WIDTH / SLIDE_DELTA) * TIMER_DELAY / 1000;

// all the main images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;

// all the thumbnail images
const thumbnailElements = document.querySelectorAll('div#thumbnails img');

// position main images
for (let i = 0; i < numImages; i++) {
    imgElements[i].style.left = IMG_WIDTH * i + 'px';
}

// the first main image
let imgCurrent = document.querySelector('div#carousel img:first-child');

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

            // initialize positions of current and next images
            let leftCurrent = 0;
            let leftNext;
            if (Number(imgNext.dataset.order) > Number(imgCurrent.dataset.order)) {
                leftNext = IMG_WIDTH;
            } else {
                leftNext = -IMG_WIDTH;
            }
            imgCurrent.style.left = leftCurrent + 'px';
            imgNext.style.left = leftNext + 'px';

            // slide out current image, slide in next image
            const timerId = setInterval(() => {

                // do the transition
                if (Number(imgNext.dataset.order) > Number(imgCurrent.dataset.order)) {
                    leftCurrent -= SLIDE_DELTA;
                    leftNext -= SLIDE_DELTA;
                } else {
                    leftCurrent += SLIDE_DELTA;
                    leftNext += SLIDE_DELTA;
                }
                imgCurrent.style.left = leftCurrent + 'px';
                imgNext.style.left = leftNext + 'px';

                // sliding complete
                if (imgNext.style.left == 0 + 'px') {

                    // cancel timer and update new current image
                    clearInterval(timerId);
                    imgCurrent = imgNext;
                    imgCurrent.dataset.order = imgNext.dataset.order

                    // re-enable clicks on all thumbnails
                    for (let thumbnail of thumbnailElements) {
                        thumbnail.style.pointerEvents = 'auto';
                    }
                }   // sliding complete

            }, TIMER_DELAY);
        }       // user clicks a different thumbnail
    });     // click event listener for thumbnails
}   // for each thumbnail
