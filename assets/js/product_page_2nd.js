// Image changing JS
const mainBG = document.querySelector('.image-info--main');
const allSubBg = document.querySelectorAll('.image-info--sub .set-bg');

allSubBg.forEach((e) => {
    e.onmouseover = (k) => {
        const myBGLink = getComputedStyle(k.target).backgroundImage;
        mainBG.style.backgroundImage = myBGLink;
    }
})

// Getting shop information
fetch(`https://web-database.vercel.app/user_shop/${localStorage.getItem('shop_name')}`)
    .then(response => response.json())
    .then(myData => {
        //see(myData);
        var shop_info = myData.data[0][0];
        var shop_products = myData.data[1];
        query('#solded').textContent = shop_info.sold_amount;
        query('#customer').textContent = shop_info.sold_amount;
        // var shop_wrapper = document.querySelector('.shop_product_wrapper');
        // var product_shop = query('.product__shop');
        // var shop_pull = query('.shop-pull');
        // product_shop.querySelector('.set-bg').style.backgroundImage = `url(${shop_info.image_profile})`;
        // product_shop.querySelector('.shop__image-name').innerText = shop_info.user_nickName;
        // product_shop.querySelector('.sold-count').innerText = shop_info.sold_amount;
        // product_shop.querySelector('.customer-count').innerText = shop_info.sold_amount;
        // product_shop.querySelector('.product-count').innerText = shop_products.length;
        // localStorage.setItem("shop_sold",shop_info.sold_amount);
  
    });
// Heart like button JS
const heartButton = document.querySelector('.product-share--like');
const heartIcon = document.querySelector('.share--like-icon');
const likeCount = document.querySelector('.like-counted');
heartButton.onclick = (k) => {
    if (localStorage.getItem("login") != "success") {
        toast_message({ type: "loginPls", duration: 1000, msg: "Hãy đăng nhập trước !", icon: '<i class="fa-solid fa-triangle-exclamation"></i>' });
    } else {
        heartButton.classList.toggle('liked');
        var like = Number.parseInt(likeCount.textContent);
        if (heartButton.classList.contains('liked')) {
            like++;
            heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>'
        } else {
            like--;
            heartIcon.innerHTML = '<i class="fa-regular fa-heart"></i>'
        }
        fetch(`https://web-database.vercel.app/updateProductLike/${localStorage.getItem('productID')}/${like}`)
            .then(response => response.json())
            .then(data => see(data))
        likeCount.textContent = like + "";
    }
}

// Navigate to shop page JS
query('.shop__btn.btn').onclick = e => {
    setTimeout(() => {
        console.log(localStorage.getItem('shop_name'));
       
            // .then(data => {
            //     existProduct = queryAll('.home-product-item');
            //     // see(existProduct);
            //     existProduct.forEach(e => {
            //         e.onclick = f => {
            //             f.preventDefault();
            //             redirectToProductPage(e.parentElement);
            //         }
            //     })
            // })
            // }).then(data => {
            //     var randomProductArr = data.data;
            //     //dsee(randomProductArr);
            //     var productContainer = query('.home-product.wrapper-here .row.sm-gutter');
            //     var productContainerHTML = "";
            //     productContainerHTML = randomProductArr.reduce((a, b) => {
            //         var productHTML = getProductHTML(b, "2-4");
            //         return a + productHTML;
            //     }, "");
            //     productContainer.innerHTML = productContainerHTML;
            //     productNLArray = queryAll('.home-product.wrapper-here .row .col.l-2-4.m-4.c-6');
            //     return "Done !!";
            // })
            // .then(data => {
            //     existProduct = queryAll('.home-product-item');
            //     // see(existProduct);
            //     existProduct.forEach(e => {
            //         e.onclick = f => {
            //             f.preventDefault();
            //             redirectToProductPage(e.parentElement);
            //         }
            //     })
            // })
        window.location.href = "/shop.html";
    }, 200)
}

// Handle add product to cart
var setCartOnce = true;
const addToCartBtn = query('.btn.btn--add.add-to-cart');
addToCartBtn.onclick = e => {
    if (localStorage.getItem("login") != "success") {
        toast_message({ type: "loginPls", duration: 1000, msg: "Hãy đăng nhập trước !", icon: '<i class="fa-solid fa-triangle-exclamation"></i>' });
    } else {
        const productCount = parseFloat(query('.col.l-6.count-num').textContent);
        var cartUL = query('.header__cart-list');
        cartUL.classList.remove('header__cart-list--no-cart');
        query('.col.l-6.count-num').textContent = "0";
        itemFigure = 0;
        if (productCount != 0) {
            var checkProductInCart = query(`[id="${localStorage.getItem("userid")}-${localStorage.getItem("productID")}"]`);
            if (!checkProductInCart) {
                toast_message({ type: "login", duration: 1000, msg: "Thêm vào giỏ hàng thành công", icon: '<i class="fa-solid fa-circle-check"></i>' });
                query('.cart-notice').textContent = parseInt(query('.cart-notice').textContent) + 1;
                query('.cart__item-list').innerHTML +=
                    `<li class="cart__item" id = "${localStorage.getItem("userid")}-${localStorage.getItem("productID")}"> 
                    <img src="${query('.image-info--main.set-bg').style.backgroundImage.slice(4, -1).replace(/"/g, "")}" class="cart__item--img">
                    <div class="cart__item--info">
                        <div class="cart__item-head">
                            <h5 class="cart__item-name text-left long-name">${query('.col.l-12.product-title').textContent.trim()}</h5>
                            <div class="cart__item-price-wrap">
                                <span class="cart__item-price">${query('.after-selled').textContent}đ</span>
                                <span class="cart__item-multiply">x</span>
                                <span class="cart__item-quantity">${productCount}</span>
                            </div>
                        </div>
                        <div class="cart__item-body">
                            <span class="cart__item-descript">
                                Phân loại: <span class="product-category">${query('.product-category--special').textContent}</span>
                            </span>
                            <span class="cart__item-remove">Xóa</span>
                        </div>
                    </div>
                </li>`
                fetch(`https://web-database.vercel.app/addToCart/${localStorage.getItem("productID")}/${localStorage.getItem("userid")}/${productCount}`)
                    .then(response => response.json())
                    .then(data => see(data))
            } else {
                var myCSS = `[id="${localStorage.getItem("userid")}-${localStorage.getItem("productID")}"]`;
                var myProductInCart = query(myCSS);
                var myProductInCartCount = myProductInCart.querySelector('.cart__item-quantity');
                if (parseInt(myProductInCartCount.textContent) + productCount > parseInt(query('.data-count').textContent)) {
                    toast_message({ type: "loginPls", duration: 1000, msg: "Vượt quá số lượng sản phẩm đang có !", icon: '<i class="fa-solid fa-triangle-exclamation"></i>' });
                } else {
                    toast_message({ type: "login", duration: 1000, msg: "Thêm vào giỏ hàng thành công", icon: '<i class="fa-solid fa-circle-check"></i>' });
                    myProductInCartCount.textContent = parseInt(myProductInCartCount.textContent) + productCount;
                    fetch(`https://web-database.vercel.app/updateCart/${localStorage.getItem("productID")}/${localStorage.getItem("userid")}/${productCount}`)
                        .then(response => response.json())
                        .then(data => see(data))
                }
            }
        } else {
            toast_message({ type: "loginPls", duration: 1000, msg: "Hãy thêm sản phẩm trước !", icon: '<i class="fa-solid fa-circle-check"></i>' });
        }
    }
}