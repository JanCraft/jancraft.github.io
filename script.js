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

const backtotop = document.getElementById("back-to-top");
window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backtotop.style.opacity = "100%";
  } else {
    backtotop.style.opacity = "0%";
  }

  const topdist = document.body.scrollTop || document.documentElement.scrollTop;
  document.getElementById('nav-home').classList.remove('active');
  document.getElementById('nav-about').classList.remove('active');
  document.getElementById('nav-games').classList.remove('active');
  document.getElementById('nav-software').classList.remove('active');
  if (topdist > 4600) {
    document.getElementById('nav-software').classList.add('active');
  } else if (topdist > 1300) {
    document.getElementById('nav-games').classList.add('active');
  } else if (topdist > 360) {
    document.getElementById('nav-about').classList.add('active');
  } else {
    document.getElementById('nav-home').classList.add('active');
  }
};

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}