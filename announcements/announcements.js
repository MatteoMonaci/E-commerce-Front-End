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

    inputWord.addEventListener('input', () => {
        const searchWord = inputWord.value.toLowerCase();
        const filteredByWord = data.filter(ann => ann.title.toLowerCase().includes(searchWord));

        annWrapper.innerHTML = '';
        annWrapper.style.minHeight = "max-content";

        showCardsAnn(filteredByWord);
        dialogBuy();
    });


    // byCategory
    const allCategories = data.map(el => el.category);

    const uniqueCategories = [...new Set(allCategories)];

    console.log(uniqueCategories);

    let categoriesBody = $('#categories-body')

    uniqueCategories.forEach((category) => {
        let div = document.createElement('div')
        div.classList.add('d-flex', 'align-item-center')
        div.innerHTML = `
            <input type="radio" class="input-category" id="${category}" name="category">
            <label for="${category}" class="ps-3">${category}</label>
        `
        categoriesBody.appendChild(div)

    })

    let allCategoriesInput = Array.from(document.querySelectorAll('.input-category'));
    console.log(allCategoriesInput);

    allCategoriesInput.forEach(input => input.addEventListener('click', () => {
        filteredByCategory(input)
    }))

    function filteredByCategory(input) {
        if(input.checked) {
            let filtered = data.filter(ann => ann.category === input.id);
            showCardsAnn(filtered);
            dialogBuy();
        }
    }

});