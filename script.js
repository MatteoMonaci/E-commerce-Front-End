const $ = (s, o=document) => o.querySelector(s);
const $$ = (s, o=document) => o.querySelectorAll(s)

const lastAnnContainer = $('.last-ann-container')

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.style.transitionDuration = "1.5s";
            entry.target.style.transitionProperty = "all";
            entry.target.style.margin = "0";
        }
    });
}, { threshold: 0.25});

// impostare threshold a 0.50 per schermi telefono

observer.observe(lastAnnContainer);