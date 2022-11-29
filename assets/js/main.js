// You have to saved all your product here before classify other function
const productNLArray = queryAll('.home-product .row .col.l-2-4.m-4.c-6');

$(document).ready(function () {
    initEvents();
});

function initEvents() {
    // Phan loai san pham theo danh muc
    $('.category-item').click(function (event) {
        var test = $(this).hasClass('category-item--active');
        event.preventDefault();
        if (!test) {
            $('.category-item--active').removeClass('category-item--active');
            $(this).addClass('category-item--active');
            const productType = this.querySelector('a').textContent;
            reloadProduct(classifyProduct(productType));
        }
    })

    function classifyProduct(productType) {
        const productArr = Array.prototype.slice.call(productNLArray);
        if(productType == "Tất Cả") return productArr;
        const newArr = productArr.filter(e => {
            return e.getAttribute("producttype") == productType;
        })
        return newArr;
    }

    function reloadProduct(productArr) {
        const productWrap = query('.home-product .row');
        setTimeout(() => {
            productWrap.innerHTML = productArr.reduce((a, b) => {
                return a + b.outerHTML;
            }, "");
        }, 300);
    }

    // Item menu bar function
    const productWrap = query('.home-product .row');
    const priceLabel = query('.select-input__label');
    query('.select-input__list').onclick = (e) => {
        const productNLArrayNew = queryAll('.home-product .row .col.l-2-4.m-4.c-6');
        const productArray = Array.prototype.slice.call(productNLArrayNew);
        if (e.target.classList.contains('high-price')) {
            e.preventDefault();
            priceLabel.textContent = "Giá cao đến thấp";
            productArray.sort(highPriceSort);
        } else {
            e.preventDefault();
            priceLabel.textContent = "Giá thấp đến cao";
            productArray.sort(lowPriceSort);
        }
        setTimeout(() => {
            productWrap.innerHTML = productArray.reduce((a, b) => {
                return a + b.outerHTML;
            }, "");
        }, 300);
    }

    // Home Filter Function 
    const homeBtn = queryAll('.home-filter__btn');
    homeBtn.forEach((e) => {
        e.onclick = () => {
            const productNLArrayNew = queryAll('.home-product .row .col.l-2-4.m-4.c-6');
            const productArray = Array.prototype.slice.call(productNLArrayNew);
            if (!e.classList.contains('btn--primary')) {
                const primaryBtn = query('.btn.home-filter__btn.btn--primary')
                toggleClass(primaryBtn, 'btn--primary', 'btn--normal')
                toggleClass(e, 'btn--normal', 'btn--primary')
                // Doing function for each 3 buttons here
                if (e.textContent == "Bán chạy") {
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

    // Small Function for all Function above
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
}