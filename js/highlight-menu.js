function trackScroll() {
    const body = document.querySelector("body");
    const hero = document.getElementById("hero");
    const heroScroll = hero.offsetTop - 60;
    
    const links = document.querySelectorAll(".main-nav ul a");

    const mainFunc = document.getElementById("main-functions");
    const mainFuncLink = document.querySelector('[href="#main-functions"]');
    const mainFuncScroll = mainFunc.offsetTop - 60;

    const offer = document.getElementById("offer");
    const offerLink = document.querySelector('[href="#offer"]');
    const offerScroll = offer.offsetTop - 60;

    const form = document.getElementById("form");
    const formLink = document.querySelector('[href="#form"]');
    const formScroll = form.offsetTop - 60;

    const about = document.getElementById("about-us");
    const aboutLink = document.querySelector('[href="#about-us"]');
    const aboutScroll = about.offsetTop - 60;
    
    let scrolled = window.pageYOffset;
    if (scrolled < mainFuncScroll) {
        links.forEach((link) => link.classList.remove("active-link"));
    } else if (scrolled >= mainFuncScroll && scrolled < offerScroll) {
        links.forEach((link) => link.classList.remove("active-link"));
        mainFuncLink.classList.add("active-link");
    } else if (scrolled >= offerScroll && scrolled < formScroll) {
        links.forEach((link) => link.classList.remove("active-link"));
        offerLink.classList.add("active-link");
    } else if (scrolled >= formScroll && scrolled < aboutScroll) {
        links.forEach((link) => link.classList.remove("active-link"));
        formLink.classList.add("active-link");
    } else if (scrolled >= aboutScroll) {
        links.forEach((link) => link.classList.remove("active-link"));
        aboutLink.classList.add("active-link");
    };
};

window.addEventListener("scroll", trackScroll)
