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
}, { threshold: 1, rootMargin: '-30px'});

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

    // show cards index
    let cardsWrapper = $('#cards-wrapper');

    function showCardsIndex(num) {

        let lastFour = data.slice(-num)
    
        lastFour.forEach((ann) => {
            let card = document.createElement('div');
            card.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'd-flex', 'justify-content-center');
            card.innerHTML = `
                <div class="card mb-4" style="width: 18rem;">
                    <div class="card-img-top"></div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${troncateTitle(ann.title)}</h5>
                            <p class="card-text">${troncateDesc(ann.description)}</p>
                            </div>
                        <div class="mt-3">
                            <p class="card-text">Price: ${ann.price}$</p>
                            <a href="#" class="btn btn-buy"><i class="fa-solid fa-bag-shopping me-2"></i>Buy !</a>
                        </div>
                    </div>
                </div>
            `
    
            let cardImgTop = card.querySelector('.card-img-top');
            cardImgTop.style.backgroundImage = `url('${ann.image}')`;
            cardsWrapper.prepend(card);
        })
    }

    let lastAnnBtn = $('#last-ann-btn');
    console.log(lastAnnBtn);
    let lastAnnBntWrapper = $('#last-ann-bnt-wrapper');
    console.log(lastAnnBntWrapper);
    let confirmLastAnnBtn = true;

    lastAnnBtn.addEventListener('click', () => {

        if (confirmLastAnnBtn) {
            cardsWrapper.innerHTML = "";
            showCardsIndex(8);
            lastAnnBtn.innerHTML = "see all"
            confirmLastAnnBtn = false;

            // creating link see less
            let btn = document.createElement('btn');
            btn.innerText = "see less"
            btn.classList.add('text-decoration-underline', 'd-block', 'mt-2')
            btn.style.color = "var(--dark)"
            lastAnnBntWrapper.appendChild(btn);

            // event on link see less
            btn.addEventListener('click', () => {
                cardsWrapper.innerHTML = "";
                showCardsIndex(4);
                btn.innerHTML = ""
                lastAnnBtn.innerHTML = "see more";
                confirmLastAnnBtn = true;

                // come back to last announcements position
                const marginTop = 100;
                const position = lastAnnContainer.getBoundingClientRect().top + window.scrollY - marginTop;
                window.scrollTo({top: position})
            })
        } else {
            cardsWrapper.innerHTML = "";
            showCardsIndex(4);
            lastAnnBtn.innerHTML = "see more"
            confirmLastAnnBtn = true;
        }
    })

    showCardsIndex(4);

});