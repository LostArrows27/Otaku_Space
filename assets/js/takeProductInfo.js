const productInfo = queryAll('.home-product-item');
productInfo.forEach(e => {
    console.log(e.querySelector('.home-product-item__img').style.backgroundImage.slice(4, -1).replace(/"/g, ""));
    console.log(e.querySelector('.home-product-item__name').textContent.trim());
    console.log(e.querySelector('.home-prodct-item__price--new').textContent);
    console.log("----------------------------------------------------------");
})