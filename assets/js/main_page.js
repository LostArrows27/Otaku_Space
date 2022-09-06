$('.category-item').click(function () { 
    var test =  $(this).hasClass('category-item--active');
    if(!test){
        $('.category-item--active').removeClass('category-item--active');
        $(this).addClass('category-item--active');
    }
})