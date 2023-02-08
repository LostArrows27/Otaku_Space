// You have to saved all your product here before classify other function


$(document).ready(function () {
    fetch("https://web-database.vercel.app/getCategory")
        .then(res => res.json())
        .then(data => {
            see(data)
            query('.category-list').innerHTML = `<li class="category-item category-item--active">
                                            <a href="#" class="category-item__link">Tất Cả</a>
                                            </li>`
            query('.mobile-category').innerHTML = `<li class="mobile-category__item mobile-category__item-selected">
                                            <a href="" class="mobile-category__link">Tất Cả</a>
                                            </li>`
            data.forEach(e => {
                query('.category-list').innerHTML += `<li class="category-item">
                        <a href="#" class="category-item__link">${e.category}</a>
                                                </li>`;
                query('.mobile-category').innerHTML += `<li class="mobile-category__item">
                <a href="" class="mobile-category__link">${e.category}</a>
            </li>`
                allProduct.push([{ category: e.category, product: [] }]);
            })
            initEvents();
        })
});


function initEvents() {
    console.log(pageBtnRight.classList.contains('disabled-btn'));
    console.log(pageBtnLeft.classList.contains('disabled-btn'));
    if (window.innerWidth <= 1023) {

    }
    pageBtnRight.onclick = (e) => {
        e.preventDefault();
        if (!pageBtnRight.classList.contains('disabled-btn')) {
            reloadProd(currentProductArr, currentInd, currentInd + 15);
        }

    }
    pageBtnLeft.onclick = (e) => {
        e.preventDefault();
        if (!pageBtnLeft.classList.contains('disabled-btn')) {

            if (currentInd + 1 % 15 != 0) {
                if (currentInd % 15 == 0) currentInd++;
                while (currentInd % 15 != 0) {
                    currentInd++;
                }
            }
            currentInd--;
            reloadProd(currentProductArr, currentInd - 30, currentInd - 15)
        }

    }

    query('.mobile-category').onscroll = (e) => {
        if (e.target.scrollLeft == 0) {
            // cho ben trai
            query('.blur-right').style.display = 'none';
        } else {
            query('.blur-right').style.display = 'block';
        }
        if(e.target.scrollWidth - e.target.clientWidth == e.target.scrollLeft) {
            query('.blur').style.display = 'none';
        } else {
            query('.blur').style.display = 'block'
        }
    }

    // Phan loai san pham theo danh muc 
    // FOR WEB
    $('.category-item').click(function (event) {
        var test = $(this).hasClass('category-item--active');
        event.preventDefault();
        if (!test) {
            $('.category-item--active').removeClass('category-item--active');
            $(this).addClass('category-item--active');
            const productType = this.querySelector('a').textContent;
            // reset page filter
            const primaryBtn = query('.btn.home-filter__btn.btn--primary')
            toggleClass(primaryBtn, 'btn--primary', 'btn--normal');
            const btnNewest = query('.btn-newest');
            toggleClass(btnNewest, 'btn--normal', 'btn--primary');
            if (productType == "Tất Cả") {
                currentProductArr = randomProductArr;
                if (randomProductArr.length == 0) {
                    const productWrap = query('.home-product .row');
                    productWrap.innerHTML = `<div class = "no-product--heading">Người dùng này chưa đăng bán sản phẩm nào</div>
                    <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
                    productWrap.parentElement.classList.add('no-products')
                } else {
                    reloadProd(currentProductArr);
                    productWrap.parentElement.classList.remove('no-products');
                }
            }
            else {
                currentProductArr = randomProductArr.filter(product => {
                    return product.category == productType;
                })
                if (currentProductArr.length == 0) {
                    const productWrap = query('.home-product .row');
                    productWrap.innerHTML = `<div class = "no-product--heading">Không có sản phẩm nào cho danh mục này</div>
                    <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
                    productWrap.parentElement.classList.add('no-products')
                }
                else {
                    const productWrap = query('.home-product .row');
                    productWrap.parentElement.classList.remove('no-products')
                    reloadProd(currentProductArr);

                }

            }
        }
    })
    // Phan loai san pham theo danh muc 
    // FOR MOBILE
    queryAll('.mobile-category__item').forEach(function (item) {

        item.onclick = (e) => {
            e.preventDefault();
            $('.mobile-category__item-selected').removeClass('mobile-category__item-selected');
            var test = item.classList.contains('mobile-category__item-selected');
            if (!test) {
                item.classList.add('mobile-category__item-selected')
                const productType = item.children[0].textContent
                if (productType == "Tất Cả") {
                    currentProductArr = randomProductArr;
                    if (randomProductArr.length == 0) {
                        const productWrap = query('.home-product .row');
                        productWrap.innerHTML = `<div class = "no-product--heading">Người dùng này chưa đăng bán sản phẩm nào</div>
                        <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
                        productWrap.parentElement.classList.add('no-products')
                    } else {
                        reloadProd(currentProductArr);
                        productWrap.parentElement.classList.remove('no-products');
                    }
                }
                else {
                    currentProductArr = randomProductArr.filter(product => {
                        return product.category == productType;
                    })
                    if (currentProductArr.length == 0) {
                        const productWrap = query('.home-product .row');
                        productWrap.innerHTML = `<div class = "no-product--heading">Không có sản phẩm nào cho danh mục này</div>
                        <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
                        productWrap.parentElement.classList.add('no-products')
                    }
                    else {
                        const productWrap = query('.home-product .row');
                        productWrap.parentElement.classList.remove('no-products')
                        reloadProd(currentProductArr);

                    }

                }

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
            currentProductArr.sort(sortHighLow);
        } else {
            e.preventDefault();
            priceLabel.textContent = "Giá thấp đến cao";
            currentProductArr.sort(sortLowHigh);
        }
        setTimeout(() => {
            reloadProd(currentProductArr);
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
                    currentProductArr.sort((a, b) => {
                        return b.sold_amount - a.sold_amount;
                    })
                } else {
                    // "Pho bien" and "Moi nhat" function will random
                    // Well till we have a Backend Data i will fix this 
                    shuffleProduct(currentProductArr);
                }
                setTimeout(() => {
                    reloadProd(currentProductArr);
                }, 300);
            }
        }
    })

    // Mobile Danh muc Category
    const mobileSortBar = queryAll('.header__sort_link');
    mobileSortBar.forEach(item => {
        item.onclick = (e) => {
            e.preventDefault();
            $('.header__sort-link--active').removeClass('header__sort-link--active');
            item.classList.add('header__sort-link--active');
            const category = item.innerHTML;
            if (category == "Giá thấp") {
                currentProductArr.sort(sortLowHigh);
            } else if (category == "Giá cao") {
                currentProductArr.sort(sortHighLow);
            } else if (category == "Bán chạy") {
                currentProductArr.sort((a, b) => {
                    return b.sold_amount - a.sold_amount;
                })
            } else {
                shuffleProduct(currentProductArr);
            }
            setTimeout(() => {
                reloadProd(currentProductArr);
            }, 300);
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

    function sortHighLow(a, b) {
        return b.price * (100 - b.sale_percent) / 100 - a.price * (100 - a.sale_percent) / 100;
    }

    function sortLowHigh(a, b) {
        return a.price * (100 - a.sale_percent) / 100 - b.price * (100 - b.sale_percent) / 100;
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
