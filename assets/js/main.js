const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

$(document).ready(function () {
    initEvents();
});

function initEvents(){
    $(".navbar-list__item--signUp").click(function() {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("auth-form--sign-up").style.display = "block";
    })

    $(".navbar-list__item--login").click(function() {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("auth-form--sign-in").style.display = "block";
    })

    $(".auth-form__controls-back").click(function() {
        document.getElementById("modal").style.display = "none";
        document.getElementById("auth-form--sign-in").style.display = "none";
        document.getElementById("auth-form--sign-up").style.display = "none";
        
    })

    $('.category-item').click(function () { 
        var test =  $(this).hasClass('category-item--active');
        if(!test){
            $('.category-item--active').removeClass('category-item--active');
            $(this).addClass('category-item--active');
        }
    })

    // Cart Delete Function
    const cartList = query('.header__cart-list')
    cartList.onclick = (e) => {
        const delBtn = e.target;
        if(delBtn.classList.contains('cart__item-remove')) {
            const parentItem = delBtn.parentElement.parentElement.parentElement
            parentItem.remove();
        }
    }

    // Item menu bar function
    const productNLArray = queryAll('.home-product .row .col.l-2-4.m-4.c-6');
    const productArray = Array.prototype.slice.call(productNLArray);
    const productWrap = query('.home-product .row');
    const priceLabel = query('.select-input__label');
    const testArray = productArray.map((e) => {
        return extractPrice(e);
    })
    query('.select-input__list').onclick = (e) => {
        if(e.target.classList.contains('high-price')) {
            priceLabel.textContent = "Giá cao đến thấp";
            productArray.sort(highPriceSort);
        } else {
            priceLabel.textContent = "Giá thấp đến cao";
            productArray.sort(lowPriceSort);
        }
        setTimeout(() => {
            productWrap.innerHTML = productArray.reduce((a, b) => {
                return a + b.outerHTML;
            }, "");
        }, 300);
    }

    function extractPrice(product) {
        return product.querySelector('.home-prodct-item__price--new').textContent.split('.')[0];
    }

    function extractSell(product) {
        return product.querySelector('.sold-item').textContent.split(' ')[0].split('+')[0];
    }

    function lowPriceSort(a, b) {
        return extractPrice(a) - extractPrice(b);
    }

    function highPriceSort(a, b) {
        return extractPrice(b) - extractPrice(a);
    }

    function shuffleProduct(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function mostSelled(a, b) {
        return extractSell(b) - extractSell(a);
    }

    // Home Filter Function 
    const homeBtn = queryAll('.home-filter__btn');
    homeBtn.forEach((e) => {
        e.onclick = () => {
            if(!e.classList.contains('btn--primary')) {
                const primaryBtn = query('.btn.home-filter__btn.btn--primary')
                toggleClass(primaryBtn, 'btn--primary', 'btn--normal')
                toggleClass(e, 'btn--normal', 'btn--primary')
                // Doing function for each 3 buttons here
                if(e.textContent == "Bán chạy") {
                    productArray.sort(mostSelled);
                } else {
                    // "Pho bien" and "Moi nhat" function will random
                    // Well till we have a Backend Data i will fix this 
                    shuffleProduct(productArray);
                }
                setTimeout(() => {
                    productWrap.innerHTML = productArray.reduce((a, b) => {
                        return a + b.outerHTML;
                    }, "");
                }, 300);
            }
        }
    })

    function toggleClass(node, oldClass, newClass) {
        node.classList.remove(oldClass);
        node.classList.add(newClass);
    }

    // Header Search Option Function
    const option = query('.header-option');
    option.onclick = e => {
        var ele = e.target;
        // span tag
        if(!ele.classList.contains('header-option__item')) {
            ele = ele.parentElement;
        } 
        if(!ele.classList.contains('header-option__item--active')) {
            const oldOption = query('.header-option__item.header-option__item--active');
            toggleClass(oldOption, 'header-option__item--active', 'active');
            toggleClass(ele, 'active', 'header-option__item--active');
            query('.header-search__search-select-label').textContent = ele.querySelector('span').textContent;
        }
    }
}