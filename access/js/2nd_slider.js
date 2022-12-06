const slides = document.getElementById("slides");
const allSlides = document.querySelectorAll(".slide__down");
const slidesLength = allSlides.length;
const slideWidth = allSlides[0].offsetWidth ;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;
let spaceBetween=5;
let firstSlideleft=55;

let canISlide = true;

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];
const secondlastSlide = allSlides[allSlides.length - 2];
const thirdlastSlide = allSlides[allSlides.length - 3];




const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);
const cloneSecondlastSlide = secondlastSlide.cloneNode(true);
const cloneThirdlastSlide = thirdlastSlide.cloneNode(true);


slides.appendChild(cloneFirstSlide);
slides.append(cloneThirdlastSlide);
slides.insertBefore(cloneLastSlide, firstSlide);
slides.insertBefore(cloneSecondlastSlide, cloneLastSlide);
slides.insertBefore(cloneThirdlastSlide, cloneSecondlastSlide);



next.addEventListener("click", () => switchSlide("next"));
prev.addEventListener("click", () => switchSlide("prev"));

slides.addEventListener("transitionend", checkIndex);

slides.addEventListener("mousedown", dragStart);

slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

function dragStart(e) {
  e.preventDefault();
  initialPosition = slides.offsetLeft;

  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;

    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  }
}

function dragMove(e) {
  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }

  slides.style.left = `${slides.offsetLeft - posX2}px`;
}

function dragEnd() {
  /* 
    three possibilities:
    1. next slide
    2. prev slide
    3. stay still
    */
  finalPosition = slides.offsetLeft;
  if (finalPosition - initialPosition < -200) {
    switchSlide("next", "dragging");
  } else if (finalPosition - initialPosition > 200) {
    switchSlide("prev", "dragging");
  } else {
    slides.style.left = `${initialPosition}px`;
  }

  document.onmouseup = null;
  document.onmousemove = null;
}

function switchSlide(arg, arg2) {
  slides.classList.add("transition");

  if (canISlide) {
    if (!arg2) {
      initialPosition = slides.offsetLeft;
    }
    if (arg == "prev") {
      slides.style.left = `${initialPosition + (slideWidth +spaceBetween) }px`;
      index--;
    } else {
      slides.style.left = `${initialPosition -  (slideWidth +spaceBetween)}px`;
      index++;
    }
  }

  canISlide = false;
}

function checkIndex() {
  slides.classList.remove("transition");

  if (index == -1) {
    slides.style.left = `-${slidesLength * slideWidth  -firstSlideleft}px`;
    index = slidesLength - 1;
  }

  if (index == slidesLength) {
    slides.style.left = `-${1 * slideWidth - firstSlideleft}px`;
    index = 0;
  }

  canISlide = true;
}

setInterval(switchSlide,5000);