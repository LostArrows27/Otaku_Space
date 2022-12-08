// You have to saved all your product here before classify other function

var pageBtnRight = query('.btn--right');
var pageBtnLeft = query('.btn--left');
$(document).ready(function () {
    fetch("http://localhost:5000/getCategory")
        .then(res => res.json())
        .then(data => {
            see(data)
            query('.category-list').innerHTML = `<li class="category-item category-item--active">
                                            <a href="#" class="category-item__link">Tất Cả</a>
                                            </li>`
            data.forEach(e => {
                query('.category-list').innerHTML += `<li class="category-item">
                        <a href="#" class="category-item__link">${e.category}</a>
                                                </li>`;
                allProduct.push([{ category: e.category, product: [] }]);
            })
            initEvents();
        })
});

function initEvents() {
    console.log(pageBtnRight.classList.contains('disabled-btn'));
    console.log(pageBtnLeft.classList.contains('disabled-btn'));
    pageBtnRight.onclick = (e) => {
        if (!pageBtnRight.classList.contains('disabled-btn')) {
            var productContainer = query('.home-product.wrapper-here .row.sm-gutter');
            var productContainerHTML = "";
            var trackInd;
            productContainerHTML = randomProductArr.reduce((a, b, c) => {
                var productHTML = getProductHTML(b, "2-4");
                if (c <= currentInd + 15 && c > currentInd) {
                    trackInd = c;
                    return a + productHTML;
                } else {
                    return a;
                }
            }, "");
            currentInd = trackInd;
            if (currentInd == randomProductArr.length - 1) {
                pageBtnRight.classList.add('disabled-btn');
            }
            if (pageBtnLeft.classList.contains('disabled-btn')) {
                pageBtnLeft.classList.remove('disabled-btn');
            }

            productContainer.innerHTML = productContainerHTML;
        }

    }

    pageBtnLeft.onclick = (e) => {

        if (!pageBtnLeft.classList.contains('disabled-btn')) {
            var productContainer = query('.home-product.wrapper-here .row.sm-gutter');
            var productContainerHTML = "";
            var trackInd;
            if (currentInd + 1 % 15 != 0) {
                while (currentInd % 15 != 0) {
                    currentInd++;
                    console.log(currentInd);
                }
            }
            currentInd--;
            console.log(currentInd);
            productContainerHTML = randomProductArr.reduce((a, b, c) => {
                var productHTML = getProductHTML(b, "2-4");
                if (c <= currentInd - 15 && c > currentInd - 30) {
                    trackInd = c;
                    return a + productHTML;
                } else {
                    return a;
                }

            }, "");
            currentInd = trackInd;
            if (currentInd == 14) {
                pageBtnLeft.classList.add('disabled-btn');
            }
            if (pageBtnRight.classList.contains('disabled-btn')) {
                pageBtnRight.classList.remove('disabled-btn');
            }
            productContainer.innerHTML = productContainerHTML;
        }

    }
    // Phan loai san pham theo danh muc
    $('.category-item').click(function (event) {
        var test = $(this).hasClass('category-item--active');
        event.preventDefault();
        if (!test) {
            $('.category-item--active').removeClass('category-item--active');
            $(this).addClass('category-item--active');
            const productType = this.querySelector('a').textContent;

            if (productType == "Tất Cả") {
                if(randomProductArr.length == 0) {
                    const productWrap = query('.home-product .row');
                    productWrap.innerHTML = `<div class = "no-product--heading">Người dùng này chưa đăng bán sản phẩm nào</div>
                    <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
                    productWrap.parentElement.classList.add('no-products')
                } else {
                    reloadProd(randomProductArr);
                    productWrap.parentElement.classList.remove('no-products')
                    pageBtnRight.classList.remove('disabled-btn');
                    pageBtnLeft.classList.add('disabled-btn');
                }
            }
            else {
                const newArr = randomProductArr.filter(product => {
                    return product.category == productType;
                })
                if(newArr.length == 0) {
                    const productWrap = query('.home-product .row');
                    productWrap.innerHTML = `<div class = "no-product--heading">Không có sản phẩm nào cho danh mục này</div>
                    <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
                    productWrap.parentElement.classList.add('no-products')
                }
                else {
                    const productWrap = query('.home-product .row');
                    productWrap.parentElement.classList.remove('no-products')
                    reloadProd(newArr);
                }
                pageBtnRight.classList.add('disabled-btn');
                pageBtnLeft.classList.add('disabled-btn');

            }
        }
    })

    function classifyProduct(productType) {
        // const productArr = Array.prototype.slice.call(randomProductArr);
        const newArr = productArr.filter(e => {
            return e.getAttribute("producttype") == productType;
        })
        return newArr;
    }

    function reloadProd(allProd) {
        var productContainer = query('.home-product.wrapper-here .row.sm-gutter');
        var productContainerHTML = "";
        productContainerHTML = allProd.reduce((a, b, c) => {
            var productHTML = getProductHTML(b, "2-4");
            return c <= 14 ? a + productHTML : a;
        }, "");
        productContainer.innerHTML = productContainerHTML;
        currentInd = 14;
    }

    function reloadProduct(productArr) {
        const productWrap = query('.home-product .row');
        if (productArr.length == 0) {
            productWrap.innerHTML = `<img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct">`
            productWrap.parentElement.classList.add('no-products')
            return;
        } else {
            setTimeout(() => {
                productWrap.parentElement.classList.remove('no-products')
            }, 300);
        }
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
        // const productNLArrayNew = queryAll('.home-product .row .col.l-2-4.m-4.c-6');
        // const productArray = Array.prototype.slice.call(productNLArrayNew);
        if (e.target.classList.contains('high-price')) {
            e.preventDefault();
            priceLabel.textContent = "Giá cao đến thấp";
            randomProductArr.sort(sortMy);
        } else {
            e.preventDefault();
            priceLabel.textContent = "Giá thấp đến cao";
            randomProductArr.sort((a, b) => {
                return a.price * (100 - a.sale_percent) / 100 - b.price * (100 - b.sale_percent) / 100;
            });
        }
        setTimeout(() => {
            reloadProd(randomProductArr);
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
        return turnMoneyStringToNumber(product.querySelector('.home-prodct-item__price--new').textContent.split('đ')[0])
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

    function sortMy(a, b) {
        return b.price * (100 - b.sale_percent) / 100 - a.price * (100 - a.sale_percent) / 100;
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
