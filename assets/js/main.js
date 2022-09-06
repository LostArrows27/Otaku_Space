$(document).ready(function () {
    initEvents();
});

function initEvents(){
    $(".navbar-list__item--signUp").click(function() {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("auth-form--sign-up").style.display = "block";
    })

    $(".navbar-list__item--login").click(function() {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("auth-form--sign-in").style.display = "block";
    })

    $(".auth-form__controls-back").click(function() {
        document.getElementById("modal").style.display = "none";
        document.getElementById("auth-form--sign-in").style.display = "none";
        document.getElementById("auth-form--sign-up").style.display = "none";
        
    })

    $('.category-item').click(function () { 
        var test =  $(this).hasClass('category-item--active');
        if(!test){
            $('.category-item--active').removeClass('category-item--active');
            $(this).addClass('category-item--active');
        }
    })

}