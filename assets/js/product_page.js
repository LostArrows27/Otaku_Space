// Phan cua Minh
let itemFigure = 0;
const count_num =  document.getElementsByClassName('count-num');
count_num[0].innerHTML = itemFigure;
countItem = (boo) => {
    if(boo == true) {
        itemFigure++;
    }else{
        if(itemFigure >0){
            itemFigure--;
        }
    }
    count_num[0].innerHTML = itemFigure;
}
// Phan cua Dung

const purchased_box = document.querySelector('.box--purchased');
const box = document.querySelector('.purchased');
purchased = () => {
    
    purchased_box.style.display = 'flex';
    box.classList.add('Fadein');
    setTimeout(() => {  
        box.classList.remove('Fadein');
        box.classList.add('Fadeout');
        itemFigure =  0;
        count_num[0].innerHTML = itemFigure;
        setTimeout(() => {
            purchased_box.style.display = 'none';
        }, 400);
    }, 2000);
}
