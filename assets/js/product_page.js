// Constant use later
const purchasedTitle = query('.cart__item-name--special.long-name');
const purchasedPrice = query('.cart__item-list--special .cart__item-price');
const purchasedCount = query('.cart__item-list--special .cart__item-quantity');
const purchasedCategory = query('.product-category--special.purchased-box');
const purchasedBG = query('.cart__item--img--special');
const productTitleNode = query('.product-title');
const pricePerEachNode = query('.col .total-pr');
const productCategoryNode = query('.product-category--special');
const productBGNode = query('.set-bg.info-sub-1');
const count_num = document.getElementsByClassName('count-num');
const datacount = query('.data-count');

// Phan cua Minh
let itemFigure = 0;
count_num[0].innerHTML = itemFigure;
countItem = (boo) => {
    let product_avail = datacount.innerHTML;
    if (boo == true) {
        if (itemFigure < product_avail)
            itemFigure++;
    } else {
        if (itemFigure > 0) {
            itemFigure--;
        }
    }
    if (itemFigure > 0) {
        toggleClass(buyBtn, 'btn--disabled', 'btn--primary');
    } else {
        toggleClass(buyBtn, 'btn--primary', 'btn--disabled');
    }
    count_num[0].innerHTML = itemFigure;
}

// "Mua ngay" 1 product handle
var box = document.querySelector('.purchased');
const buyBtn = query('.btn.btn--shopping');
purchased = () => {
    if (itemFigure > 0) {
        buyFromCart = false;
        buyNow = true;
        purchased_box.style.display = 'flex';
        box.classList.add('Fadein');
        // Handle receiption form - start
        let productTitle = productTitleNode.textContent.trim();
        let pricePerEach = pricePerEachNode.textContent.trim();
        let productCategory = productCategoryNode.textContent.trim();
        let productCount = itemFigure;
        let productBG = getComputedStyle(productBGNode).backgroundImage.split('"')[1];
        let productTotalPrice = parseInt(productCount) * parseInt(pricePerEach.slice(1)) * 1000;
        purchasedTotalPrice.textContent = numberWithCommas(productTotalPrice) + "đ";
        purchasedWrap.innerHTML = ` <li class="cart__item">
                                        <img src="${productBG}" alt="" class="cart__item--img--special">
                                        <div class="cart__item--info">
                                            <div class="cart__item-head">
                                                <h5 class="cart__item-name--special long-name">${productTitle}</h5>
                                                <div class="cart__item-price-wrap">
                                                    <span class="cart__item-price">${pricePerEach.slice(1) + "đ"}</span>
                                                    <span class="cart__item-multiply">x</span>
                                                    <span class="cart__item-quantity">${productCount}</span>
                                                </div>
                                            </div>
                                            <div class="cart__item-body">
                                                <span class="cart__item-descript"> Phân loại: 
                                                    <span class="product-category--special purchased-box">${productCategory}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </li>`
        // Handle receiption form - end
        setTimeout(() => {
            box.classList.remove('Fadein');
        }, 500)
    }

}



// Confirm purchased in purchased step
var confirmBox = query('.confirm');
confirmBox.onclick = () => {
    box.classList.add('Fadeout');
    setTimeout(() => {
        box.classList.remove('Fadeout');
        purchased_box.style.display = 'none';
    }, 300)
    if(buyNow) {
        datacount.textContent = parseInt(datacount.innerHTML) - itemFigure;
        itemFigure = 0;
        count_num[0].innerHTML = itemFigure;
        toggleClass(buyBtn, 'btn--primary', 'btn--disabled');
    }
    if(buyFromCart) {
        cartList.classList.add('header__cart-list--no-cart');
        cartListUL.innerHTML = "";
    }
}



// Small Function use later






