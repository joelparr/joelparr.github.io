(function(w, d){
    var homeElem = document.getElementById('home'),
        homeElemWatcher = scrollMonitor.create(homeElem),

        headerElem = document.getElementById('header'),

        headerLogotypeElem = document.getElementById('logotype'),
        headerLogotypeHideClass = headerLogotypeElem.dataset.classHide,
        headerLogotypeGoneClass = headerLogotypeElem.dataset.classGone;

    // Check to see if the page is scrolled (i.e. home element is above
    // viewport at all) and if so hide the header logotype
    if (homeElemWatcher.isAboveViewport) {
      headerLogotypeElem.classList.add(headerLogotypeHideClass);
    }

    headerLogotypeElem.classList.remove(headerLogotypeGoneClass);

    if (window.getComputedStyle(headerElem).position !== 'absolute') {

        // Do scroll monitoring

        var sectionElems = document.getElementsByClassName('section'),

            headerElemOffsetPx = window.getComputedStyle(headerElem).top,
            headerElemOffset = parseInt(headerElemOffsetPx),
            headerInvertClass = headerElem.dataset.classInvert,

            headerLogomarkElem = document.getElementById('logomark');

        // Fade in/out header logotype

        homeElemWatcher.stateChange(function() {
          // When page is scrolled, check to see if home element is scrolled
          // (i.e. above viewport at all) and if so hide the header logotype.
          if (this.isAboveViewport) {
            headerLogotypeElem.classList.add(headerLogotypeHideClass);
          } else {
            headerLogotypeElem.classList.remove(headerLogotypeHideClass);
          }
        });

        Array.prototype.forEach.call(sectionElems, function(sectionElem) {
            var sectionElemWatcher = scrollMonitor.create(sectionElem,
                { top: headerElemOffset, bottom: -headerElemOffset }
            );

            sectionElemWatcher.stateChange(function() {
                if (this.isAboveViewport && this.isInViewport) {
                    if (this.watchItem.classList.contains('invert')) {
                        headerElem.classList.add(headerInvertClass);
                    } else {
                        headerElem.classList.remove(headerInvertClass);
                    }
                }
            });
        });
    }

    // Lazy loading

    var b = d.getElementsByTagName('body')[0];
    var s = d.createElement('script');
    var v = !('IntersectionObserver' in w) ? '8.17.0' : '10.19.0';

    s.async = true;
    s.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@' + v + '/dist/lazyload.min.js';

    w.lazyLoadOptions = {
        elements_selector: '.lazy'
    };

    b.appendChild(s);

    // Smooth Scroll if possible

    if ('scrollBehavior' in document.documentElement.style) {
        var smoothScrollElems = document.querySelectorAll('[data-smoothscroll]');

        Array.prototype.forEach.call(smoothScrollElems, function(scrollElem) {
            scrollElem.addEventListener('click', function(e) {
                e.preventDefault();

                var scrollElemID = scrollElem.hash.substr(1),
                    targetElem = document.getElementById(scrollElemID);

                targetElem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            });
        });
    }
}(window, document));
