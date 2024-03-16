//! fetch

fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(data=> {

    let annWrapper = $('#ann-wrapper');

    function showCardsAnn() {
    
        data.forEach((ann) => {
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

    showCardsAnn();
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
    }

    //filters

    //byWord
    

});