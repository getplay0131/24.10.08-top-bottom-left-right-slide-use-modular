document.addEventListener("DOMContentLoaded", () => {
  const slideArea = document.querySelector(".slideArea");
  const slideTrack = document.querySelector(".slideTrack");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const topBtn = document.querySelector("#topBtn");
  const bottomBtn = document.querySelector("#bottomBtn");

  const Btns = [prevBtn, nextBtn, topBtn, bottomBtn];

  let currentIndex = 0;
  let slideMode = true;
  let MovingRight = true;
  let MovingDown = true;
  let intervalId = null;
  let slidesLength = slides.length;

  function slideModeNow() {
    if (slideMode) {
      stopSlideShow();
      slideShow(MovingRight, "translateX", "row");
      autoSlideStart();
    } else {
      stopSlideShow();
      slideShow(MovingDown, "translateY", "column");
      autoSlideStart();
    }
  }

  function slideShow(moving, translate, flex) {
    if (moving) {
      slideTrack.style.flexDirection = flex;
      currentIndex = (currentIndex + 1) % slidesLength;
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
      if (currentIndex === slidesLength - 1) {
        setTimeout(() => {
          currentIndex = 0;
          slideTrack.style.transition = "none";
          slideTrack.style.transform = `${translate}(0)`;
          slideTrack.offsetHeight;
        }, 500);
      }
    } else {
      // 무한 반복 로직에서 ai 도움 받음
      slideTrack.style.flexDirection = flex;
      currentIndex = (currentIndex - 1 + slidesLength) % slidesLength;
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
      if (currentIndex === 0) {
        setTimeout(() => {
          currentIndex = slidesLength - 1;
          slideTrack.style.transition = "none";
          slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
          slideTrack.offsetHeight;
          //   slideTrack.removeChild(slides[slidesLength - 1]);
        }, 500);
      }
    }
  }

  function autoSlideStart() {
    stopSlideShow();
    intervalId = setInterval(slideModeNow, 2500);
  }

  function stopSlideShow() {
    clearInterval(intervalId);
  }

  function reverseRight() {
    stopSlideShow();
    MovingRight = !MovingRight;
    slideModeNow();
    autoSlideStart();
  }

  function reverseTop() {
    stopSlideShow();
    MovingDown = !MovingDown;
    slideModeNow();
    autoSlideStart();
  }
  //  이벤트리스너 구역

  function eventDectected() {
    slideArea.addEventListener("mouseenter", () => {
      stopSlideShow();
    });

    slideArea.addEventListener("mouseleave", () => {
      autoSlideStart();
    });

    prevBtn.addEventListener("click", () => {
      setTimeout(() => {
        stopSlideShow();
        slideMode = true;
        reverseRight();
      }, 500);
    });

    nextBtn.addEventListener("click", () => {
      setTimeout(() => {
        stopSlideShow();
        slideMode = true;
        reverseRight();
      }, 500);
    });

    topBtn.addEventListener("click", () => {
      setTimeout(() => {
        stopSlideShow();
        slideMode = false;
        reverseTop();
      }, 500);
    });

    bottomBtn.addEventListener("click", () => {
      setTimeout(() => {
        stopSlideShow();
        slideMode = false;
        reverseTop();
      }, 500);
    });
  }

  eventDectected();
  slideModeNow();
  // end -------------------------------------
});
