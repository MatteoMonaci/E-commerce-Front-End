//! fetch

fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(data=> {

    let annWrapper = $('#ann-wrapper');

    function showCardsAnn(announcements) {
    
        annWrapper.innerHTML = ""

        announcements.forEach((ann) => {
            let card = document.createElement('div');
            card.classList.add('col-12', 'col-sm-6', 'col-xl-4' ,'d-flex', 'justify-content-center');
            card.innerHTML = `
                <div class="card mb-4" style="width: 18rem;">
                    <div class="card-img-top"></div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${troncate(ann.title, 25)}</h5>
                            <p class="card-text">${troncate(ann.description, 60)}</p>
                            </div>
                        <div class="mt-3">
                            <p class="card-text price">Price: ${ann.price}$</p>
                            <button class="btn btn-buy"><i class="fa-solid fa-bag-shopping me-2"></i>Buy !</button>
                        </div>
                    </div>
                </div>
            `
            
            let cardImgTop = card.querySelector('.card-img-top');
            cardImgTop.style.backgroundImage = `url('${ann.image}')`;
            annWrapper.prepend(card);
            annWrapper.style.minHeight = "max-content";
            
        })

    }
    
    showCardsAnn(data);
    dialogBuy();

    //dialog
    function dialogBuy() {
        let dBuy = $('.d-buy')
        
        let btnBuy = $$('.btn-buy')
        
        function openDialogBuy() {
            dBuy.setAttribute('open', true);
        }
        let btnDialogBuy = $('.btn-dialog-buy')
        
        btnBuy.forEach((btn) => {
            btn.addEventListener('click', openDialogBuy) 
        })

        btnDialogBuy.addEventListener('click', () => {
            dBuy.close()
        })
    };


    //filters

    //byWord
    const inputWord = $('#word');

    function filterByWord(array) {
        const searchWord = inputWord.value.toLowerCase();
        const filtered = array.filter(ann => ann.title.toLowerCase().includes(searchWord));
        return filtered
    }


    // byCategory
    const allCategories = data.map(el => el.category);

    const uniqueCategories = [...new Set(allCategories)];

    let categoriesBody = $('#categories-body')

    uniqueCategories.forEach((category) => {
        let div = document.createElement('div')
        div.classList.add('d-flex', 'align-item-center')
        div.innerHTML = `
            <input type="radio" class="input-category" id="${category}" name="category">
            <label for="${category}" class="ps-3 align-self-center">${category}</label>
        `
        categoriesBody.appendChild(div)

    })

    let allCategoriesInput = Array.from(document.querySelectorAll('.input-category'));

    function filterByCategory(array){
        let checked = allCategoriesInput.find((input) => input.checked)
        let categoria = checked.id

        if(categoria != 'all'){
            let filtered = array.filter((el) => el.category == categoria)
            return filtered
        } else {
            return array
        }
    }

    var radioButtonAll = $('#all');
    radioButtonAll.addEventListener("focus", function() {
        radioButtonAll.checked = true;
    });



    // byPrice
    const prices = data.map(ann => ann.price)
    const maxPrice = prices.sort((a, b) => b - a)[0]
    const minPrice = prices.sort((a, b) => a - b)[0]

    const priceRange = $('#price-range');
    const fieldPrice = $('.field-price')
    priceRange.max = maxPrice;
    priceRange.min = minPrice;
    priceRange.value = maxPrice;
    fieldPrice.value = priceRange.value


    function filterByPrice(array) {
        let filtered = array.filter(ann => ann.price <= fieldPrice.value)
        return filtered
    }
    
    
    // events
    inputWord.addEventListener('input', () => {
        globalfilter()
    });
    
    allCategoriesInput.forEach(input => input.addEventListener('click', () => {
        globalfilter()
    }))

    priceRange.addEventListener('input', () => {
        fieldPrice.value = priceRange.value
        globalfilter()
    })


    fieldPrice.addEventListener('input', () => {
        setTimeout(() => {
            priceRange.value = fieldPrice.value;
            globalfilter();
        }, 800);
    });


    // globalfilter
    function globalfilter() {
        let filteredByWord = filterByWord(data)
        let filteredByCategory = filterByCategory(filteredByWord)
        let filteredByPrice = filterByPrice(filteredByCategory)

        showCardsAnn(filteredByPrice)

        if (filteredByPrice.length == 0) {
            let div = document.createElement('div')
            div.classList.add('text-center', 'my-auto')
            div.style.fontSize = "calc(1rem + .5vw)"
            div.style.fontWeight = "200"
            div.innerHTML = `
                <p> your search returned no results </p>    
                <p> <a href="announcements.html" class="link-search-fail">click here</a> to find what you're looking for.</p>
            `
            
            annWrapper.style.height = "60vh"
            annWrapper.style.paddingBottom = "0"
            annWrapper.classList.remove('pt-5')
            annWrapper.appendChild(div);
        }
    }

});