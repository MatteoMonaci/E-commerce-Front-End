const $ = (s, o=document) => o.querySelector(s);
const $$ = (s, o=document) => o.querySelectorAll(s)

//! function intervall

let regUsers = $('#reg-users');
let totalAnn = $('#total-ann');

let countingConfirm = true;

function createCounting (el, start, num, end, freq) {
    let counter = start;
    if (countingConfirm) {
        let interval = setInterval(() => {
            if (counter < end) {
                counter += num;
                el.innerHTML = counter + "k"
            } else {
                clearInterval(interval)
            }
    
        }, freq)
    }
}

const statRow = $('.statistics-row')

const statRowObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            createCounting(totalAnn, 0, 4, 780, 10);
            createCounting(regUsers, 0, 1, 120, 10);
            countingConfirm = false;
        }
    });
}, { threshold: 1, rootMargin: '-50px'});

statRowObserver.observe(statRow);


//! functions troncate

function troncateTitle(string) {

    if (visualViewport.width < 576) {
        return string.slice(0, 16) + "..."
    } else if (visualViewport.width < 769) {
        return string.slice(0, 14) + "..."
    } else if (visualViewport.width < 992) {
        return string.slice(0, 16) + "..."
    } else {
        return string.slice(0, 24) + "..."
    }
}

function troncateDesc(string) {

    if (visualViewport.width < 576) {
        return string.slice(0, 24) + "..."
    } else if (visualViewport.width < 769) {
        return string.slice(0, 56) + "..."
    } else if (visualViewport.width < 992) {
        return string.slice(0, 45) + "..."
    } else {
        return string.slice(0, 44) + "..."
    }
}

//! intesection last announcements section

const lastAnnContainer = $('.last-ann-container')

const lastAnnContainerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.style.transitionDuration = "1.5s";
            entry.target.style.transitionProperty = "all";
            entry.target.style.margin = "0";
        }
    });
}, { threshold: 0.25});

lastAnnContainerObserver.observe(lastAnnContainer);

//! fecth last announcements

fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(data=> {

    let cardsWrapper = $('#cards-wrapper');

    function showCardsIndex(num) {       
        let lastFour = data.slice(num)
    
        lastFour.forEach((ann) => {
            let card = document.createElement('div');
            card.classList.add('col-12', 'col-md-6', 'col-lg-3', 'd-flex', 'justify-content-center');
            card.innerHTML = `
                <div class="card">
                    <div class="card-img-top"></div>
                    <div class="card-body">
                        <h5 class="card-title">${troncateTitle(ann.title)}</h5>
                        <p class="card-text">${troncateDesc(ann.description)}</p>
                        <p class="card-text">Price: ${ann.price}$</p>
                        <a href="#" class="btn btn-buy"><i class="fa-solid fa-bag-shopping me-2"></i>Buy !</a>
                    </div>
                </div>
            `
    
            let cardImgTop = card.querySelector('.card-img-top');
            cardImgTop.style.backgroundImage = `url('${ann.image}')`;
            cardsWrapper.prepend(card);
        })
    }

    showCardsIndex(-4);

});