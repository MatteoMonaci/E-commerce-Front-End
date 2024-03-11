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

observer.observe(lastAnnContainer);

//! fecth

fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(data=> {
    let cardsWrapper = $('#cards-wrapper');

    let lastFour = data.slice(-4)

    console.log(lastFour);

    lastFour.forEach((ann) => {
        let card = document.createElement('div');
        card.classList.add('col-12', 'col-md-6', 'col-lg-3', 'd-flex', 'justify-content-center');
        card.innerHTML = `
        <div class="card" style="width: 100%;">
            <img src="${ann.image}" class="card-img-top w-100" alt="...">
            <div class="card-body">
                <h5 class="card-title">${ann.title}</h5>
                <p class="card-text">${ann.description}</p>
                <p class="card-text">Price: ${ann.price}$</p>
                <a href="#" class="btn btn-buy"><i class="fa-solid fa-bag-shopping me-2"></i>Buy !</a>
            </div>
        </div>
        `

        cardsWrapper.prepend(card)
    })
})