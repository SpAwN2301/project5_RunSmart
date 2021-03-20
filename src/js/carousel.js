var slider = tns({
  container: '.my-slider',
  items: 1,
  slideBy: 'page',
  autoplay: true,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
  controls: false,
  nav: false,

  responsive: {
    556: {
      gutter: 20,
      items: 3
    },
    768: {
      gutter: 50,
      items: 2
    },
    1024: {
      items: 1
    }
  }
});

document.querySelector('.slider__prev').addEventListener('click', function(){
  slider.goTo('prev');
})

document.querySelector('.slider__next').addEventListener('click', function(){
  slider.goTo('next');
})