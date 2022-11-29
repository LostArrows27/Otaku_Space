// Const for use later
const menuComponent  = Array.prototype.slice.call(queryAll('.user__interact--heading'));
const contentComponent  = Array.prototype.slice.call(queryAll('.user__information'));
const strike = query('.strike')

// Strike menu effect handle and change content
menuComponent.forEach((a, b) => {
    a.onclick = () => {
        if(b == 0) {
            strike.style.top = "0";
            contentComponent[0].classList.remove('unactive');
            contentComponent[1].classList.add('unactive');
        } else {
            strike.style.top = "80px";
            contentComponent[1].classList.remove('unactive');
            contentComponent[0].classList.add('unactive');
        }
    }
})

// Handle Toast message when submit product alooooooalloooo kikoenainoka