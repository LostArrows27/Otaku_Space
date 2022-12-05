var box = document.querySelector('.purchased');
const purchasedWrap = query('.cart__item-list--special');
const purchasedTotalPrice = query('.total-price__amount');
const purchased_box = document.querySelector('.box--purchased');
const cartListUL = query('.cart__item-list');
const closeBox = query('.close');
var buyNow = false;
var buyFromCart = false;

// Cancel (Close) in purchased step
if(closeBox) {
    closeBox.onclick = () => {
        box.classList.add('Fadeout');
        setTimeout(() => {
            box.classList.remove('Fadeout');
            purchased_box.style.display = 'none';
        }, 300)
    }
}

// Cart purchased handle
if(cartBtn) {
    console.log(cartBtn);
    cartBtn.onclick = (e) => {
        e.preventDefault();
        buyFromCart = true;
        buyNow = false;
        const cartProductArr = Array.prototype.slice.call(cartListUL.querySelectorAll('.cart__item'));
        var totalPrice = 0;
        var purchasedListHTMl = cartProductArr.reduce((a,b) => {
            let receiptBG = b.querySelector('img').src;
            let receiptTitle = b.querySelector('h5').textContent;
            let receiptPricePerEach = b.querySelector('.cart__item-price').textContent;
            let receiptCount = b.querySelector('.cart__item-quantity').textContent;
            let receiptCategory = b.querySelector('.product-category').textContent;
            totalPrice += turnMoneyStringToNumber( b.querySelector('.cart__item-price').textContent.slice(0, -1)) * parseInt(receiptCount);
            let receiptProductHTML =  ` <li class="cart__item">
                                            <img src="${receiptBG}" alt="" class="cart__item--img--special">
                                            <div class="cart__item--info">
                                                <div class="cart__item-head">
                                                    <h5 class="cart__item-name--special long-name">${receiptTitle}</h5>
                                                    <div class="cart__item-price-wrap">
                                                        <span class="cart__item-price">${receiptPricePerEach}</span>
                                                        <span class="cart__item-multiply">x</span>
                                                        <span class="cart__item-quantity">${receiptCount}</span>
                                                    </div>
                                                </div>
                                                <div class="cart__item-body">
                                                    <span class="cart__item-descript"> Phân loại: 
                                                        <span class="product-category--special purchased-box">${receiptCategory}</span>
                                                     </span>
                                                </div>
                                            </div>
                                        </li>`
            return a + receiptProductHTML;
        }, "");
        purchasedWrap.innerHTML = purchasedListHTMl;
        purchasedTotalPrice.textContent = numberWithCommas(totalPrice) + "đ";
        purchased_box.style.display = 'flex';
        cartListUL.style.display = "none";
        box.classList.add('Fadein');
        setTimeout(() => {
            cartListUL.style.display = "block";
            box.classList.remove('Fadein');
        }, 300)
    }
}

// Confirm purchased in purchased step
var confirmBox = query('.confirm');
if(confirmBox) {
    confirmBox.onclick = () => {
        box.classList.add('Fadeout');
        setTimeout(() => {
            box.classList.remove('Fadeout');
            purchased_box.style.display = 'none';
            toast_message({type:"buynow",msg:"Thanh toán thành công"});
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
            cart_notice.innerHTML = "0";
        }
        
        
    }
}
