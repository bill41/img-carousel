// carousel parms
const IMG_WIDTH = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--width-img')
);
const SLIDE_DELTA = 2;
const TIMER_DELAY_SLIDE = 7;
const TIMER_DELAY_NEXT_IMG = 5000;

// all the images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;

// position the images
for (let i = 0; i < numImages; i++) {
  imgElements[i].style.left = IMG_WIDTH * i + 'px';
}

// the first image
let imgFirst = document.querySelector('div#carousel img:first-child');
let imgCurrent = imgFirst;

// transition to next image
setInterval(() => {
  // get next image
  let imgNext = imgCurrent.nextElementSibling;
  if (!imgNext) {
    imgNext = imgFirst;
  }

  // initialize positions of current and next images
  let leftCurrent = 0;
  let leftNext;
  leftNext = IMG_WIDTH;
  imgCurrent.style.left = leftCurrent + 'px';
  imgNext.style.left = leftNext + 'px';

  // slide out current image, slide in next image
  const timerIdSlide = setInterval(() => {
    // do the transition
    leftCurrent -= SLIDE_DELTA;
    leftNext -= SLIDE_DELTA;
    imgCurrent.style.left = leftCurrent + 'px';
    imgNext.style.left = leftNext + 'px';

    // sliding complete
    if (imgNext.style.left == 0 + 'px') {
      // cancel timer and update new current image
      clearInterval(timerIdSlide);
      imgCurrent = imgNext;
    } // sliding complete
  }, TIMER_DELAY_SLIDE); // slide timer
}, TIMER_DELAY_NEXT_IMG); // next image timer
