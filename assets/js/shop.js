
fetch(`http://localhost:5000/user_shop/${localStorage.getItem('shop_name')}`)
    .then(response => response.json())
    .then(myData => {
        //see(myData);
        var shop_info = myData.data[0][0];
        currentProductArr = myData.data[1];
        randomProductArr = myData.data[1];
        var shop_wrapper = document.querySelector('.shop_product_wrapper');
        var product_shop = query('.product__shop');
        var shop_pull = query('.shop-pull');
        product_shop.querySelector('.set-bg').style.backgroundImage = `url(${shop_info.image_profile})`;
        product_shop.querySelector('.shop__image-name').innerText = shop_info.user_nickName;
        product_shop.querySelector('.sold-count').innerText = shop_info.sold_amount;
        product_shop.querySelector('.customer-count').innerText = shop_info.sold_amount;
        product_shop.querySelector('.product-count').innerText = currentProductArr.length;
        localStorage.setItem("shop_sold", shop_info.sold_amount);
        console.log(shop_pull, 'hello');
        var clone_shop_products = currentProductArr;
        reloadProd(currentProductArr);
        // var shopHtml = currentProductArr.reduce((acc, product) => {
        //     var productHTML = getProductHTML(product, "2-4");
        //     return acc + productHTML;
        // }, '')
        clone_shop_products.sort((a, b) => {
            return b.sold_amount - a.sold_amount;
        })

        var divided;
        if (clone_shop_products.length <= 6) {
            divided = clone_shop_products.length != 5 ? 12 / clone_shop_products.length + '' : '2-4';
        } else {
            clone_shop_products = clone_shop_products.slice(0, 6);
            divided = 2;
        }

        var topProductHtml = clone_shop_products.reduce((acc, product) => {
            var producthtml = getBoxProduct(product, divided);
            return acc + producthtml;
        }, '')


        // var space_left = 12 - count * 2;
        // var space_one_columm = space_left / 2;
        // var auto_align = `<div class="col l-${space_one_columm} m-4 c-6" ></div>`;
        shop_pull.innerHTML = topProductHtml;
        productNLArray = queryAll('.shop_product_wrapper .col');
        if (currentProductArr.length == 0) {
            const productWrap = query('.home-product .row');
            productWrap.innerHTML = `<div class = "no-product--heading">Người dùng này chưa đăng bán sản phẩm nào</div>
            <img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct" width = "300px">`
            productWrap.parentElement.classList.add('no-products')
        }
        return "Done !!";
    });

// Classify product
// console.log(productNLArrayNew);
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
    if (productType == "Tất Cả") return productArr;
    const newArr = productArr.filter(e => {
        return e.getAttribute("producttype") == productType;
    })
    see(newArr)
    return newArr;
}

function reloadProduct(productArr) {
    // shop no product hien ra
    const productWrap = query('.home-product .row');
    if (productArr.length == 0) {
        productWrap.innerHTML = `<img src="https://ohuivina.com/assets/images/no-cart.png" alt="" class = "image-noproduct">`
        productWrap.parentElement.style = 'display: flex; justify-content: center';
        return;
    }
    setTimeout(() => {
        productWrap.innerHTML = productArr.reduce((a, b) => {
            return a + b.outerHTML;
        }, "");
    }, 300);
}