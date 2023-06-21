
// init body elm
const elmBody = document.querySelector('body');

const dp = {
    mobileNav: (show) => {
        const elmHtml = document.querySelector('html');
        if (show) {
            elmHtml.classList.add('menu-active');
        } else {
            elmHtml.classList.remove('menu-active');
        }
    },
    touch: {
        isTouchDevice: () => {
            var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
            var mq = function (query) {
                return window.matchMedia(query).matches;
            }
            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                return true;
            }
            var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
            return mq(query);
        },
        addTouchState: () => {
            // set class for touch/no-touch on <html>
            // call the functions for each state
            const elmHtml = document.querySelector('html');
            if (dp.touch.isTouchDevice()) {
                elmHtml.classList.add('touch');
                dp.execTouch();
            } else {
                elmHtml.classList.add('no-touch');
                dp.execNoTouch();
            }
        },
        init: () => {
            dp.touch.addTouchState();
        }
    },
    execNoTouch: () => {
        // console.log('No-touch JS running');
    },
    execTouch: () => {
        // console.log('Touch JS running');
        dp.touchMenu.init();
    },
    touchMenu: {
        init: () => {
            // get menu items that have sub-menus
            const elmsMegaMenuItems = document.querySelectorAll('.has-children');
            elmsMegaMenuItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    // not active, set active class to show sub-menu
                    if (!item.classList.contains('active')) {
                        event.preventDefault(); // prevent following the link
                        elmsMegaMenuItems.forEach(navItem => {
                            navItem.classList.remove('active');
                        });
                        item.classList.add('active');
                    } 
                });
            });
        }
    },
    init: () => {
        // remove .no-js class from html-tag
        document.querySelector('html').classList.remove('no-js');
        
        // startup the touch/no-touch scripts
        dp.touch.init();
    }
}

dp.init();


/* hover intent */
var dropDown = document.querySelectorAll('.menu-item');
var instance = new SV.HoverIntent(dropDown, {
    onEnter: function(targetItem) {
      // called on mouseenter with intent
      targetItem.classList.add('visible');
    },
    onExit: function(targetItem) {
      // call on mouseleave after timeout
      targetItem.classList.remove('visible');
    },
});

/* scroll event triggers */
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        elmBody.classList.add('scrolled');
        alreadyScrolled = true;
    } else {
        elmBody.classList.remove('scrolled');
        alreadyScrolled = false;
    }
});

/* accordions */
const accordionHeader = document.querySelectorAll('.accordion .header');

accordionHeader.forEach(header => {
    header.addEventListener('click', (e) => {
        e.target.parentElement.classList.toggle('active');
        console.log(e.target.nextElementSibling);
        const accordionContent = e.target.nextElementSibling;
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
    });
});