// Const for use later
const menuComponent = Array.prototype.slice.call(queryAll('.user__interact--heading'));
const contentComponent = Array.prototype.slice.call(queryAll('.user__information'));
const strike = query('.strike')
var isActive = 0;
var closeBtn

fetch('http://localhost:5000/userOrder/' + localStorage.getItem('userid'))
    .then(res => res.json())
    .then(data => {
        query('.col.l-11.user__info-text.scroll_order').innerHTML = data.reduce((a, b) => {
            var myReceipt = `<div class="row order test">
                                <div class="col l-3 order-id">${b.orderid}</div>
                                <div class="col l-4 order-date">${b.orderDate}</div>
                                <div class="col l-5 order-money">${b.totalMoney}</div>
                            </div>`
            return a + myReceipt;
        }, "")
        query('.order-close').onclick = f => {
            var box = query('.box--order');
            var box_inside = query('.ordered');
            box_inside.classList.remove('Fadein');
            box_inside.classList.add('Fadeout');
            setTimeout(() => {
                box_inside.classList.remove('Fadeout');
                box.style.display = 'none';
            }, 300)
        }
        queryAll('.test').forEach(e => {
            e.onclick = f => {
                var box = query('.box--order');
                var box_inside = query('.ordered');
                box_inside.classList.add('Fadein');
                box.style.display = 'flex';
                query('.order-heading').textContent = `Đơn thanh toán mã ${e.querySelector('.order-id').textContent}`
                query('.orders-overAll').textContent = `${e.querySelector('.order-money').textContent}`;
                query('.order-ul').innerHTML = data.filter(a => {
                    return a.orderid == parseInt(e.querySelector('.order-id').textContent);
                })[0].productInfo.reduce((a, b) => {
                    var myHTMLLI = `<li class="cart__item">
                    <img src="${b.img}" alt=""
                        class="cart__item--img--special">
                    <div class="cart__item--info">
                        <div class="cart__item-head">
                            <h5 class="cart__item-name--special long-name">${b.productName}</h5>
                            <div class="cart__item-price-wrap">
                                <span class="cart__item-price">${numberWithCommas(b.price)}đ</span>
                                <span class="cart__item-multiply">x</span>
                                <span class="cart__item-quantity">${b.productAmount}</span>
                            </div>
                        </div>
                        <div class="cart__item-body">
                            <span class="cart__item-descript">
                                Phân loại: <span class="product-category--special purchased-box">${b.category}</span>
                            </span>
                        </div>
                    </div>
                </li>`
                    return a + myHTMLLI;
                }, "")
                //
                //lam not di nha dung xong r
            }
        })
    })

// Take all user cart information a 
//ok :)))))))) aoke okoo h toi di ngu
// onegai itashimasu

// Strike menu effect handle and change content
menuComponent.forEach((a, b) => {
    a.onclick = () => {
        console.log(b);
        if (b == 0) {
            strike.style.top = "0";
            contentComponent[b].classList.remove('unactive');
            contentComponent[isActive].classList.add('unactive');
            isActive = 0;
        } else if (b == 1) {
            strike.style.top = "80px";
            contentComponent[b].classList.remove('unactive');
            contentComponent[isActive].classList.add('unactive');
            isActive = 1;
        } else {
            strike.style.top = "160px";
            contentComponent[b].classList.remove('unactive');
            contentComponent[isActive].classList.add('unactive');
            isActive = 2;
        }
    }
})

// Handle Toast message when submit product doc comt di
const uploadItem = query('.uploadItem');
if (uploadItem) {
    uploadItem.onclick = (e) => {
        console.log(12);
        e.preventDefault();
        toast_message({ type: "salenow", msg: "Đăng bán thành công" });
    }
}

// Load Info base on user information
const avatar = query('.user__info--avatar');
const userName = query('.user-name');
const userDob = query('.user-dob');
const userPass = query('.user-password');
const myName = queryAll('.user-login-name');
if (localStorage.getItem("login") == "success") {
    avatar.src = localStorage.getItem("img");
    myName.forEach(e => {
        e.innerText = localStorage.getItem("fullname");
    })
    userName.innerText = localStorage.getItem("userid");
    userDob.innerText = localStorage.getItem("dob");
    var userPassHased = localStorage.getItem("password");
    for (var i = 2; i < userPassHased.length; i++) {
        userPassHased = setCharAt(userPassHased, i, '*');
    }
    userPass.innerText = userPassHased;
}

// Function use later
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}



