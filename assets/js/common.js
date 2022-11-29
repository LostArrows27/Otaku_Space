// Constant
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const cartBtn = query('.btn.btn--primary.header-cart-btn');

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
const logOut = query('.logOut');
if (logOut) {
    logOut.onclick = e => {
        e.preventDefault();
        setTimeout(() => {
            window.location.href = "no_login.html";
        }, 300);
    }
}

// Log In Delay Time
const logIn = queryAll('.btn--login');
if (logIn.length > 0) {
    logIn.forEach(e => {
        e.onclick = f => {
            f.preventDefault();
            setTimeout(() => {
                window.location.href = "index.html";
            }, 300);
        }
    })
}

// Cart Delete Function
const cartList = query('.header__cart-list');
const cart_notice = query('.cart-notice');
cart_notice.textContent  =  queryAll('.header__cart-list .cart__item').length; 
cartList.onclick = (e) => {
    const delBtn = e.target;
    if (delBtn.classList.contains('cart__item-remove')) {
        const parentItem = delBtn.parentElement.parentElement.parentElement
        parentItem.remove();
        cart_notice.textContent  =  queryAll('.header__cart-list .cart__item').length; 
        if (queryAll('.header__cart-list .cart__item').length == 0) {
            cartList.classList.add('header__cart-list--no-cart');
        }
    }
}

// Header Search Option Function
const option = query('.header-option');
option.onclick = e => {
    var ele = e.target;
    // span tag
    if (!ele.classList.contains('header-option__item')) {
        ele = ele.parentElement;
    }
    // ken ka shiteai ne 
    if (!ele.classList.contains('header-option__item--active') && !ele.classList.contains('header-search__search-select')) {
        const oldOption = query('.header-option__item.header-option__item--active');
        toggleClass(oldOption, 'header-option__item--active', 'active');
        toggleClass(ele, 'active', 'header-option__item--active');
        query('.header-search__search-select-label').textContent = ele.querySelector('span').textContent;
    }
}

// Switch between log in and sign up form

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

// Navigate to main page 
const main_page = query('.header__logo-img');
main_page.onclick = e => {
    var mouse = e.target;
    if(mouse.closest('.header__logo-img')){
        setTimeout(() => {
            window.location.href = "index.html";
        }, 300);
    }
}

// Handle buy in cart while no-login => force user to do login step
var path = window.location.pathname;
var page = path.split("/").pop();
if(page == "no_login.html") {
    // another handle
}