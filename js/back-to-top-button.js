(function() {
  
    function trackScroll() {
      let scrolled = window.pageYOffset;
  
      if (scrolled > 50) {
        goTopBtn.classList.add('back-to-top-button-show');
      }
      if (scrolled < 50) {
        goTopBtn.classList.remove('back-to-top-button-show');
      }
    }
  
    let goTopBtn = document.querySelector('.back-to-top-button');
  
    window.addEventListener('scroll', trackScroll);
  })();