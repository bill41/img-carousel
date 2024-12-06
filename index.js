// image id delimiter
const IMG_ID_DELIMITER = '-thumb';

// all the main images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;

// all the thumbnail images
const thumbnailElements = document.querySelectorAll('div#thumbnails img');

// show the first main image
let imgCurrent = document.querySelector('div#carousel img:first-child');
imgCurrent.style.opacity = 1;

// click event listener for thumbnail images
for (thumbnail of thumbnailElements) {

    thumbnail.addEventListener('click', evt => {

        // relationship of ids of thumbnails and main images
        // id of thumbnail is "<img-name>-thumb", of main image is "<img-name>"

        // clicked thumbnail image
        const thumbClicked = evt.currentTarget;
        const thumbIdClicked = thumbClicked.getAttribute('id');

        // display corresponding main image
        const imgId = thumbIdClicked.split(IMG_ID_DELIMITER)[0];
        const imgNext = document.getElementById(imgId);
        if (imgNext != imgCurrent) {
            imgNext.style.opacity = 1;
            imgCurrent.style.opacity = 0;
            imgCurrent = imgNext;
        }
    });     // event listener for thumbnails
}   // for each thumbnail
