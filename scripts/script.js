
// init body elm
const elmBody = document.querySelector('body');

const code = {
    mobileNav: {
        show: (show) => {
            const elmHtml = document.querySelector('html');
            if (show) {
                elmHtml.classList.add('menu-active');
            } else {
                elmHtml.classList.remove('menu-active');
            }
        },
        init: () => {
            // set close button
            document.querySelector("#nav-close-btn").addEventListener("click", (event) => {
                event.preventDefault();
                code.mobileNav.show(false);
            });

            // set open button
            document.querySelector("#nav-open-btn").addEventListener("click", (event) => {
                event.preventDefault();
                code.mobileNav.show(true);
            });

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
            if (code.touch.isTouchDevice()) {
                elmHtml.classList.add('touch');
                code.execTouch();
            } else {
                elmHtml.classList.add('no-touch');
                code.execNoTouch();
            }
        },
        init: () => {
            code.touch.addTouchState();
        }
    },
    execNoTouch: () => {
        // console.log('No-touch JS running');
    },
    execTouch: () => {
        // console.log('Touch JS running');
        code.touchMenu.init();
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
    scrollEvent: {
        init: () => {
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
        }
    },
    accordions: {
        init: () => {
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
        }
    },
    init: () => {
        // remove .no-js class from html-tag
        document.querySelector('html').classList.remove('no-js');

        code.mobileNav.init();

        // startup the touch/no-touch scripts
        code.touch.init();

        // startup scroll event script
        code.scrollEvent.init();

        // startup any accordions on the page
        code.accordions.init();
    }
}

code.init();



