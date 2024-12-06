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
    
        // set opacities of current and next images
        imgCurrent.style.opacity = 0;
        imgNext.style.opacity = 1;

    });     // event listener for buttons
}   // for each button
