const $ = (s, o=document) => o.querySelector(s);
const $$ = (s, o=document) => o.querySelectorAll(s)

const ciao = document.querySelector('#ciao');
const titleDue = document.querySelector('#titleDue');

const lastAnnContainer = $('.last-ann-container')
console.log(lastAnnContainer); 

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const inViewport = entry.isIntersecting;
        if (inViewport) {
            console.log('ciao');
        }
        entry.target.style.transitionDuration = "1s";
        entry.target.style.transitionProperty = "all";
        entry.target.style.width = inViewport ? "100%" : "80%";
    });
}, { threshold: 0.35});

observer.observe(ciao);