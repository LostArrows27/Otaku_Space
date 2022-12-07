

// Constant
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const cartBtn = query('.btn.btn--primary.header-cart-btn');
const logInMenu = query('.navbar-list--no-login--special');
const notLogInMenu = queryAll('.not-login');
const afterLogInMenu = query('.navbar-list__item.navbar-user');
const modal = query('#modal');
const logInMenuOnMobile = query('.navbar-list__item.navbar-user.hide.hide-special')
const mobileNotLogIn = query('.mobile-menu-not-log-in');
const tabletNotLogIn = query('.not-log-in-tablet')
const myAvatar = queryAll('.navbar-user__avatar');
const searchInput = query('.header-search__search-input')
const searchResult = query('.history-search')
var productNLArray;
var logMobileBtn;
var existProduct;
var text;
var searchRecently;
var userSearchRecently;
const singUpForm = query('#sign-up-form');
if (singUpForm) {
    const signUpInput = singUpForm.querySelector('input')
}

window.onload = e => {
    console.log(window.location.href);
    if (localStorage.getItem("login") == "success") {
        queryAll('.user-login-name').forEach(e => {
            e.textContent = localStorage.getItem("fullname");
        })
        logInMenu.classList.remove('navbar-list--no-login--special')
        notLogInMenu.forEach((a) => {
            a.style.display = "none";
        })
        myAvatar.forEach(e => {
            e.src = localStorage.getItem("img");
        })
        afterLogInMenu.style.display = '';
        logInMenuOnMobile.classList.remove('hide-special');
        mobileNotLogIn.style.display = 'none';
        tabletNotLogIn.style.display = 'none';
        // Set up user history search
        fetch("http://localhost:5000/userSearchHistory/" + localStorage.getItem("userid"))
            .then(res => res.json())
            .then(data => {
                console.log('Search History: ');
                see(data)
                searchResult.innerHTML = data.reduce((a, b, c) => {
                    var myHTML = `<li class="history-item"><a href="#" onclick="event.preventDefault()">${b.search_history}</a></li>`
                    return c <= 4 ? a + myHTML : a;
                }, "")
                userSearchRecently = searchResult.innerHTML;
            })
        // Set up user cart data
        fetch("http://localhost:5000/userCart/" + localStorage.getItem("userid"))
            .then(response => response.json())
            .then(data => {
                see(data);
                query('.cart-notice').textContent = data.length;
                if (data.length != 0) {
                    query('.header__cart-list').classList.remove('header__cart-list--no-cart');
                }
                var myCartUL = query('.cart__item-list');
                myCartUL.innerHTML = data.reduce((a, b) => {
                    var priceAfterSelled = parseInt(b.price) * (1 - b.sale_percent / 100) / 1000;
                    priceAfterSelled = priceAfterSelled.toFixed() * 1000;
                    var cartEle = `<li class="cart__item" id = "${b.cart_user_id}-${b.product_id}">
                <img src="${b.main_image}"
                    class="cart__item--img">
                <div class="cart__item--info">
                    <div class="cart__item-head">
                        <h5 class="cart__item-name text-left long-name">${b.product_name.trim()}</h5>
                        <div class="cart__item-price-wrap">
                            <span class="cart__item-price">${numberWithCommas(priceAfterSelled)}đ</span>
                            <span class="cart__item-multiply">x</span>
                            <span class="cart__item-quantity">${b.product_amount}</span>
                        </div>
                    </div>
                    <div class="cart__item-body">
                        <span class="cart__item-descript">
                            Phân loại: <span class="product-category">${b.category}</span>
                        </span>
                        <span class="cart__item-remove">Xóa</span>
                    </div>
                </div>
            </li>`
                    return a + cartEle;
                }, "")


            })
    } else {
        query('.header__cart-list').classList.add('header__cart-list--no-cart');
        query('.cart-notice').textContent = "0";
        query('.history-heading').textContent = "Được tìm kiếm gần đây";
        fetch(`http://localhost:5000/randomProduct/5`)
            .then(res => res.json())
            .then(data => {
                data = data.data;
                searchResult.innerHTML = data.reduce((a, b, c) => {
                    var liHTML = `<li class="history-item" onclick="event.preventDefault();redirectToProductPageAfterPostProduct(${b.product_id}, ${b.sale_percent}, 100)" id="${b.owner_name}-${b.product_id}"><a href="#">${b.product_name}</a></li>`
                    return c <= 4 ? a + liHTML : a;
                }, "")
                searchRecently = searchResult.innerHTML;
            })
    }
    if (window.location.href.includes("no_login.html")) {
        fetch("http://localhost:5000/randomProduct/15")
            .then(response => response.json())
            .then(data => {
                var randomProductArr = data.data;
                // see(randomProductArr);
                var productContainer = query('.home-product.wrapper-here .row.sm-gutter');
                var productContainerHTML = "";
                productContainerHTML = randomProductArr.reduce((a, b) => {
                    var productHTML = getProductHTML(b, "2-4");
                    return a + productHTML;
                }, "");
                productContainer.innerHTML = productContainerHTML;
                productNLArray = queryAll('.home-product.wrapper-here .row .col.l-2-4.m-4.c-6');
                return "Done !!";
            })
            .then(data => {
                existProduct = queryAll('.home-product-item');
                // see(existProduct);
                existProduct.forEach(e => {
                    e.onclick = f => {
                        f.preventDefault();
                        redirectToProductPage(e.parentElement);
                    }
                })
            })
    }
    if (window.location.href.includes("productPage.html")) {
        // Take Random Product
        fetch("http://localhost:5000/randomProduct/6")
            .then(response => response.json())
            .then(data => {
                var randomProductArr = data.data;
                var productContainer = query('.row.sm-gutter.similar-container');
                var productContainerHTML = "";
                productContainerHTML = randomProductArr.reduce((a, b) => {
                    var productHTML = getProductHTML(b, "2");
                    return a + productHTML;
                }, "");
                productContainer.innerHTML = productContainerHTML;
                return "Done !!"
            })
            .then(data => {
                existProduct = queryAll('.home-product-item');
                // see(existProduct);
                existProduct.forEach(e => {
                    e.onclick = f => {
                        f.preventDefault();
                        redirectToProductPage(e.parentElement);
                    }
                })
            })
        // Take product info
        fetch("http://localhost:5000/productID/" + localStorage.getItem("productID"))
            .then(response => response.json())
            .then(data => {
                // productSalePercent
                var productData = data.data[0];
                // localStorage.setItem("shop_name", productData.owner_name);
                // localStorage.setItem("shop_image", productData.image_profile);
                // localStorage.setItem("shop_product_count", productData.shop_count);
                var salePercent = localStorage.getItem("productSalePercent");
                var newPrice = productData.price * (1 - parseInt(salePercent) / 100) / 1000;
                // see(productData);
                // var produdata.data[0])
                query('.shop__image-logo.set-bg').style.backgroundImage = `url(${productData.image_profile})`;
                query('.shop__image-name').textContent = productData.user_nickName
                query('.product-count').textContent = productData.shop_count;
                query('.product-title').textContent = productData.product_name;
                query('.like-counted').textContent = productData.liked_count;
                query('.data-count').textContent = productData.left_amount;
                query('.original-pr').textContent = numberWithCommas(productData.price) + "đ";
                query('.after-selled').textContent = numberWithCommas(newPrice.toFixed() * 1000);
                query('.sale-percent').textContent = salePercent + "% giảm";
                query('.product-category--special').textContent = productData.category;
                query('.image-info--main.set-bg').style.backgroundImage = `url(${productData.main_image})`;
                for (var i = 1; i <= 5; i++) {
                    if (i == 1) {
                        query(`.set-bg.info-sub-1`).style.backgroundImage = `url(${productData.main_image})`;
                    }
                    else {
                        var myUrl = productData[`sub_image${i - 1}`];
                        query(`.set-bg.info-sub-${i}`).style.backgroundImage = `url(${myUrl})`
                    }
                }
                query('.sold-count').textContent = productData.sold_amount;
            })


    }
}

// Mobile login 
if (mobileNotLogIn) {
    logMobileBtn = mobileNotLogIn.querySelectorAll('.navbar__menu-item');
}

// Sign Up form pop up
$(".navbar-list__item--signUp").click(function () {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("auth-form--sign-up").style.display = "block";
})

// Login form pop up
$(".navbar-list__item--login").click(function () {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("auth-form--sign-in").style.display = "block";
})

// Back to main page for login sign up form
$(".auth-form__controls-back").click(function () {
    document.getElementById("modal").style.display = "none";
    document.getElementById("auth-form--sign-in").style.display = "none";
    document.getElementById("auth-form--sign-up").style.display = "none";

})

// Log Out Delay Time
const logOut = queryAll('.logOut');
if (logOut) {
    var logOutCount = false;
    logOut.forEach(btn => {
        btn.onclick = e => {
            if (logOutCount == false) {
                logOutCount = true;
                e.preventDefault();
                localStorage.setItem("login", null)
                toast_message({ type: "login", duration: 1000, msg: "Đăng xuất thành công !", icon: '<i class="fa-solid fa-circle-check"></i>' });
                setTimeout(() => {
                    window.location.href = "no_login.html";
                }, 1500)
            }
        }
    })
}

// Handle Search Option
// .header-search__search-input:focus~.header__search-history
searchInput.onkeyup = e => {
    text = searchInput.value;
    if (text) {
        // 2 step
        // 1. send search history back to backend
        // 2. query products based on search value
        fetch(`http://localhost:5000/searchProduct/${text}`)
            .then(res => res.json())
            .then(data => {
                query('.history-heading').textContent = "Kết quả tìm kiếm"
                searchResult.innerHTML = data.reduce((a, b, c) => {
                    var liHTML = `<li class="history-item" onclick="event.preventDefault();redirectToProductPageAfterPostProduct(${b.product_id}, ${b.sale_percent}, 100)" id="${b.owner_name}-${b.product_id}"><a href="#">${b.product_name}</a></li>`
                    return c <= 9 ? a + liHTML : a;
                }, "")
            })
    }
}

searchInput.onfocus = e => {
    if (searchInput.value == "" && localStorage.getItem("login") == "success") {
        query('.history-heading').textContent = "Lịch sử tìm kiếm gần đây";
        // fetch('http://localhost:5000/searchHistory')
        searchResult.innerHTML = userSearchRecently;
    }
    if(searchInput.value == "" && localStorage.getItem("login") == "null") {
        query('.history-heading').textContent = "Gợi ý tìm kiếm sản phẩm";
        searchResult.innerHTML = searchRecently;
    }
}

// 


// Cart Delete Function
const cartList = query('.header__cart-list');
const cart_notice = query('.cart-notice');
cart_notice.textContent = queryAll('.header__cart-list .cart__item').length;
cartList.onclick = (e) => {
    const delBtn = e.target;
    if (delBtn.classList.contains('cart__item-remove')) {
        const parentItem = delBtn.parentElement.parentElement.parentElement;
        var parentID = parentItem.id;
        var deleteUserID = parentID.split('-')[0];
        var deleteProductID = parentID.split('-')[1];
        see(deleteUserID);
        see(deleteProductID);
        fetch('http://localhost:5000/deleteCartItem', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ user_id: deleteUserID, product_id: deleteProductID })
        })
            .then(response => response.json())
            .then(data => see(data))
        parentItem.remove();
        cart_notice.textContent = queryAll('.header__cart-list .cart__item').length;
        if (queryAll('.header__cart-list .cart__item').length == 0) {
            cartList.classList.add('header__cart-list--no-cart');
        }
    }
}

// Header Search Option Function
// const option = query('.header-option');
// option.onclick = e => {
//     var ele = e.target;
//     if (!ele.classList.contains('header-option__item')) {
//         ele = ele.parentElement;
//     }
//     if (!ele.classList.contains('header-option__item--active') && !ele.classList.contains('header-search__search-select')) {
//         const oldOption = query('.header-option__item.header-option__item--active');
//         toggleClass(oldOption, 'header-option__item--active', 'active');
//         toggleClass(ele, 'active', 'header-option__item--active');
//         query('.header-search__search-select-label').textContent = ele.querySelector('span').textContent;
//     }
// }

// Log In sign up on mobile
if (logMobileBtn) {
    logMobileBtn.forEach((e) => {
        e.onclick = (f) => {
            f.preventDefault();
            console.log(e.textContent);
            if (e.textContent.trim() == "Đăng nhập") {
                document.getElementById("modal").style.display = "flex";
                document.getElementById("auth-form--sign-in").style.display = "block";
            } else {
                document.getElementById("modal").style.display = "flex";
                document.getElementById("auth-form--sign-up").style.display = "block";
            }
        }
    })
}


//My shop button
var a = query('.my_shop');

a.onclick = () =>{
    localStorage.setItem('shop_name',localStorage.getItem('userid'));
    window.location.href = "shop.html";
}
// Switch between log in and sign up form

// Navigate to main page 
const main_page = query('.header__logo-img');
main_page.onclick = e => {
    var mouse = e.target;
    if (mouse.closest('.header__logo-img')) {
        setTimeout(() => {
            window.location.href = "no_login.html";
        }, 300);
    }
}

// Handle buy in cart while no-login => force user to do login step
var path = window.location.pathname;
var page = path.split("/").pop();
if (page == "no_login.html") {
    // another handle
}

//toast function
const toast_message = ({ type = "", msg = "", duration = 3000, icon = `<i class="fa-sharp fa-solid fa-shield-check"></i>` }) => {
    const main = query('#toast');
    if (main) {
        let toast = document.createElement('div');
        toast.onclick = function (e) {
            if (e.target.closest(".toast--close")) {
                main.removeChild(toast);
            }
        }
        let delay = (duration / 1000).toFixed(2);
        console.log(msg, type);
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `SlideIn .5s ease-in, Fadeout .5s ${delay}s forwards`
        toast.innerHTML = `<div class="toast--content">
                            <div class="toast--icon">${icon}</div>
                            <div class="toast--body">${msg}</div>
                            <div class="toast--close">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </div>
                        </div>
                        <div class="toast--runtime" style="animation: Runtime ${delay}s linear forwards;"></div>`;
        main.appendChild(toast);
        setTimeout(() => {
            if (main.childNodes.length > 0) {
                main.removeChild(toast);
            }
        }, duration + 500);
    }
}



// Small Function for all function above
function toggleClass(node, oldClass, newClass) {
    node.classList.remove(oldClass);
    node.classList.add(newClass);
}

function numberWithCommas(x) {
    // Ex: 123456789 --> 123.456.789
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function redirection() {
    setTimeout(() => {
        window.location.href = "shop.html";
    }, 200)
}

// Well quicker syntax for the "console.log(function)"
// Now you just need to type "see(smth)" and done
function see(a) {
    console.log(a);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function redirectToProductPage(product) {
    console.log(product);
    var productID = product.querySelector('div').classList[0]
    var shop_name = product.querySelector('div').classList[1];
    localStorage.setItem("productID", productID)
    localStorage.setItem("shop_name", shop_name)
    var salePercent = product.querySelector('.home-product-item__sale-off-percent').textContent.split('%')[0];
    localStorage.setItem("productSalePercent", salePercent)
    window.location.href = "productPage.html";
}

// fetch("http://localhost:5000/getCategory")
//     .then(res => res.json())
//     .then(data => {
//         see(data)
//         query('.category-list').innerHTML = `<li class="category-item category-item--active">
//                                             <a href="#" class="category-item__link">Tất Cả</a>
//                                             </li>`
//         data.forEach(e => {
//             query('.category-list').innerHTML +=  `<li class="category-item">
//                         <a href="#" class="category-item__link">${e.category}</a>
//                                                 </li>`
//         })
//         initEvents();
//     })

function redirectToProductPageAfterPostProduct(productID, sale, userid , duration = 1000) {
    console.log('Get back now');
    if (duration == 100 && localStorage.getItem("login") == "success") {
        fetch(`http://localhost:5000/saveSearch/${text}/${localStorage.getItem("userid")}`)
            .then(res => res.json())
            .then(data => { return data })
            .then(data2 => {
                setTimeout(() => {
                    localStorage.setItem("productSalePercent", sale)
                    localStorage.setItem("productID", productID)
                    window.location.href = "productPage.html";
                }, duration)
            })
    } else {
        setTimeout(() => {
            localStorage.setItem("productSalePercent", sale)
            localStorage.setItem("productID", productID)
            localStorage.setItem("shop_name", userid)
            window.location.href = "productPage.html";
        }, duration)
    }
}

function turnMoneyStringToNumber(money) {
    money = money.trim();
    return money.split('.').reduce((a, b) => {
        return a * 1000 + parseInt(b);
    }, 0);
}

function getProductHTML(productInfo, sign) {
    var salePercent = productInfo.sale_percent;
    var afterCellPrice = parseInt(productInfo.price) * (1 - salePercent / 100) / 1000;
    var myHTML = `<div class="col l-${sign} m-4 c-6" productType="${productInfo.category}">
    <div class = "${productInfo.product_id} ${productInfo.owner_name}"></div>
    <a class="home-product-item" href="./productPage.html" onclick="event.preventDefault();redirectToProductPage(event.target.parentElement.parentElement)">
        <div class="home-product-item__img"
            style="background-image: url(${productInfo.main_image});">
        </div>
        <h4 class="home-product-item__name">
            ${productInfo.product_name}
        </h4>
        <div class="home-product-item__price">
            <span class="home-prodct-item__price--old">${numberWithCommas(productInfo.price)}đ</span>
            <span class="home-prodct-item__price--new">${numberWithCommas(afterCellPrice.toFixed() * 1000)}đ</span>
        </div>
        <div class="home-product-item__action">
            <span class="home-product-item__heart home-product-item__heart--liked">
                <i class="fa-regular fa-heart"></i>
                <!-- Heart Tim -->
                <i class="fa-solid fa-heart home-product-item__heart--liked-heart"></i>
            </span>
            <div class="home-product-item__rating">
                <i class="fa-solid fa-star home-product-item__gold"></i>
                <i class="fa-solid fa-star home-product-item__gold"></i>
                <i class="fa-solid fa-star home-product-item__gold"></i>
                <i class="fa-solid fa-star home-product-item__gold"></i>
                <i class="fa-solid fa-star"></i>
                <span class="sold-item">${productInfo.sold_amount} đã bán</span>
            </div>
        </div>
        <div class="home-product-item__origin">
            <span class="home-product-item__brand">Kim Đồng</span>
            <span class="home-product-item__name-city">Việt Nam</span>
        </div>
        <div class="home-product-item__favortie">
            <i class="fa-solid fa-check"></i>
            <span>Yêu thích</span>
        </div>
        <div class="home-product-item__sale-off">
            <span class="home-product-item__sale-off-percent">${salePercent}%</span>
            <span class="home-product-item__sale-off-label">GIẢM</span>
        </div>
    </a>
    </div>`
    return myHTML;
}

function getBoxProduct(productInfo,ratio) {
    var salePercent = productInfo.sale_percent;
    var afterCellPrice = parseInt(productInfo.price) * (1 - salePercent / 100) / 1000;
    var myHTML = `<div class="col l-${ratio} m-4 c-6 box_product"  productType="${productInfo.category}">
    <div class="box_product_shop">
        <div class = "${productInfo.product_id} ${productInfo.owner_name}"></div>
        <a class="home-product-item" href="./productPage.html" onclick="event.preventDefault();redirectToProductPage(event.target.parentElement.parentElement)">
            <div class="home-product-item__img"
                style="background-image: url(${productInfo.main_image});">
            </div>
            <h4 class="home-product-item__name">
                ${productInfo.product_name}
            </h4>
            <div class="home-product-item__price">
                <span class="home-prodct-item__price--old">${numberWithCommas(productInfo.price)}đ</span>
                <span class="home-prodct-item__price--new">${numberWithCommas(afterCellPrice.toFixed() * 1000)}đ</span>
            </div>
            <div class="home-product-item__action">
                <span class="home-product-item__heart home-product-item__heart--liked">
                    <i class="fa-regular fa-heart"></i>
                    <!-- Heart Tim -->
                    <i class="fa-solid fa-heart home-product-item__heart--liked-heart"></i>
                </span>
                <div class="home-product-item__rating">
                    <i class="fa-solid fa-star home-product-item__gold"></i>
                    <i class="fa-solid fa-star home-product-item__gold"></i>
                    <i class="fa-solid fa-star home-product-item__gold"></i>
                    <i class="fa-solid fa-star home-product-item__gold"></i>
                    <i class="fa-solid fa-star"></i>
                    <span class="sold-item">${productInfo.sold_amount} đã bán</span>
                </div>
            </div>
            <div class="home-product-item__origin">
                <span class="home-product-item__brand">Kim Đồng</span>
                <span class="home-product-item__name-city">Việt Nam</span>
            </div>
            <div class="home-product-item__favortie">
                <i class="fa-solid fa-check"></i>
                <span>Yêu thích</span>
            </div>
            <div class="home-product-item__sale-off">
                <span class="home-product-item__sale-off-percent">${salePercent}%</span>
                <span class="home-product-item__sale-off-label">GIẢM</span>
            </div>
        </a>
        </div>
    </div>`
    return myHTML;
}

