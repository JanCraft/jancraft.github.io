{
    const elist = document.getElementsByClassName('nav-link');
    for (const e of elist) {
        if (location.pathname == e.getAttribute('href')) {
            e.classList.add('active');
            e.setAttribute('data-active', '');
            e.setAttribute('aria-active', 'page');
        }
    }
}

const VIEWS = {
    '/': 'view-default',
    '/games': 'view-games',
    '/software': 'view-software',
    '/about': 'view-about',
};
{
    const elist = document.getElementsByTagName('view');
    for (const e of elist) {
        if (VIEWS[location.pathname] == e.getAttribute('name')) {
            e.hidden = false;
        }
    }
}

const backtotop = document.getElementById("back-to-top");
window.onscroll = () => { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backtotop.style.opacity = "100%";
  } else {
    backtotop.style.opacity = "0%";
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}