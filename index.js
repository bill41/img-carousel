/*
 * carousel parameters
*/

// image parms
const IMG_WIDTH = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--width-img'));
const SCALE_FACTOR = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'));
const IMG_DISPLAY_WIDTH = IMG_WIDTH * SCALE_FACTOR;

// transition parms
const TRANSITION_SLIDE = 'slide';
const TRANSITION_FADE = 'fade';
const SLIDE_DELTA = 2;
const TIMER_DELAY_SLIDE = 12;
const OPACITY_DELTA = 0.01;
const TIMER_DELAY_FADE = 50;
const TIMER_DELAY_NEXT_IMG = 7500;


/*
 * function to transition to the next image
*/

const imgNextTransition = () => {

  // get next image
  imgNext = imgCurrent.nextElementSibling;
  if (!imgNext) {
    imgNext = imgFirst;
  }

  if (transitionValue === TRANSITION_SLIDE) {

    // position and show the images
    for (let i = 0; i < numImages; i++) {
      imgElements[i].style.left = IMG_DISPLAY_WIDTH * i + 'px';
      imgElements[i].style.opacity = 1;
    }

    // initialize positions of current and next images
    let leftCurrent = 0;
    let leftNext;
    leftNext = IMG_DISPLAY_WIDTH;
    imgCurrent.style.left = leftCurrent + 'px';
    imgNext.style.left = leftNext + 'px';

    // slide out current image, slide in next image
    timerIdSlide = setInterval(() => {
      leftCurrent -= SLIDE_DELTA;
      leftNext -= SLIDE_DELTA;
      imgCurrent.style.left = leftCurrent + 'px';
      imgNext.style.left = leftNext + 'px';

      // sliding complete
      if (imgNext.style.left <= 0 + 'px') {
        clearInterval(timerIdSlide);
        imgCurrent = imgNext;
      } // sliding complete
    }, TIMER_DELAY_SLIDE); // slide timer

  } else if (transitionValue === TRANSITION_FADE) {

    // set opacities of the images and set their positions
    for (let i = 0; i < numImages; i++) {
      imgElements[i].style.opacity = 0;
      imgElements[i].style.left = '0px';
    }

    // initialize opacities of current and next images
    let opacityCurrent = 1;
    let opacityNext = 0;
    imgCurrent.style.opacity = opacityCurrent;
    imgNext.style.opacity = opacityNext;

    // fade out current image, fade in next image
    timerIdFade = setInterval(() => {
      opacityCurrent -= OPACITY_DELTA;
      opacityNext += OPACITY_DELTA;
      imgCurrent.style.opacity = opacityCurrent;
      imgNext.style.opacity = opacityNext;

      // fading complete
      if (imgNext.style.opacity >= 1) {
        clearInterval(timerIdFade);
        imgCurrent.style.opacity = 0;
        imgNext.style.opacity = 1;
        imgCurrent = imgNext;
      } // fading complete
    }, TIMER_DELAY_FADE); // fade timer
  } // fade transition
};  // function imgNextTransition


/*
 * entry point of the carousel
*/

// get the carousel element
const carousel = document.getElementById('carousel');

// get all the images
const imgElements = document.querySelectorAll('div#carousel img');
const numImages = imgElements.length;

// get the radio button elements, the checked radio button element,
// and the checked radio button's value for the transition effects
const transitionEffects = document.querySelectorAll('input[name="transition-effect"]');
const transitionEffectChecked = document.querySelector(
  'input[name="transition-effect"]:checked'
);
let transitionValue = transitionEffectChecked.value;

// set transition effect class to the carousel element
if (transitionValue === TRANSITION_SLIDE) {
  carousel.classList.add(TRANSITION_SLIDE);
  carousel.classList.remove(TRANSITION_FADE);
}
else if (transitionValue === TRANSITION_FADE) {
  carousel.classList.add(TRANSITION_FADE);
  carousel.classList.remove(TRANSITION_SLIDE);
}

// the first image
let imgFirst = document.querySelector('div#carousel img:first-child');
if (transitionValue === TRANSITION_FADE) {
  imgFirst.style.opacity = 1;
}
let imgCurrent = imgFirst;
let imgNext;
let timerIdSlide;
let timerIdFade;

// transition to next image
setInterval(imgNextTransition, TIMER_DELAY_NEXT_IMG);

// add a 'change' event listener to each transition effect radio button;
// if the radio button is checked, get its transition value
// and add the transition effect class to the carousel element
for (const effect of transitionEffects) {

  effect.addEventListener('change', () => {
    if (effect.checked) {
      transitionValue = effect.value;

      // set transition effect class to the carousel element
      if (transitionValue === TRANSITION_SLIDE) {
        carousel.classList.add(TRANSITION_SLIDE);
        carousel.classList.remove(TRANSITION_FADE);
      }
      else if (transitionValue === TRANSITION_FADE) {
        carousel.classList.add(TRANSITION_FADE);
        carousel.classList.remove(TRANSITION_SLIDE);
      }
    }
  }); // change event listener
} // for each transition effect radio button
