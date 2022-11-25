// Image changing JS
const mainBG = document.querySelector('.image-info--main');
const allSubBg = document.querySelectorAll('.image-info--sub .set-bg');

allSubBg.forEach((e)=> {
    e.onmouseover = (k) => {
        const myBGLink = getComputedStyle(k.target).backgroundImage;
        mainBG.style.backgroundImage = myBGLink;
    }
})

// Heart like button JS
const heartButton = document.querySelector('.product-share--like');
const heartIcon = document.querySelector('.share--like-icon');
const likeCount = document.querySelector('.like-counted');
heartButton.onclick = (k) => {
    heartButton.classList.toggle('liked');
    var like = Number.parseInt(likeCount.textContent);
    if(heartButton.classList.contains('liked')) {
        like ++;
        heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>'
    } else {
        like --;
        heartIcon.innerHTML = '<i class="fa-regular fa-heart"></i>'
    }
    likeCount.textContent = like + "";
}