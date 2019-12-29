(function () {

  document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
      const body = document.querySelector('body');
      const preloader = document.querySelector('.preloader');
      if (!body) return;
      body.style.overflow = 'hidden';

      function hiddenPreloader() {
        if (!preloader) return;
        preloader.addEventListener('transitionend', function () {
          preloader.className = 'preloader-hidden';
        });

        preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
      }

      setTimeout(function () {
        hiddenPreloader();
        body.style.overflow = '';
      }, 100);
    }
  };

})();
