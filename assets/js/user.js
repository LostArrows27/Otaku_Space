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

// Handle Toast message when submit product doc comt di
const uploadItem = query('.uploadItem');
if(uploadItem) {
    uploadItem.onclick = (e) =>{
        console.log(12);
        e.preventDefault();
        toast_message({type:"salenow",msg:"Đăng bán thành công"});
    }
}

// Load Info base on user information
const avatar = query('.user__info--avatar');
const userName = query('.user-name');
const userDob = query('.user-dob');
const userPass = query('.user-password');
const myName = queryAll('.user-login-name');
if(localStorage.getItem("login") == "success") {
    avatar.src = localStorage.getItem("img");
    myName.forEach(e => {
        e.innerText = localStorage.getItem("fullname");
    })
    userName.innerText = localStorage.getItem("userid");
    userDob.innerText = localStorage.getItem("dob");
    var userPassHased = localStorage.getItem("password");
    for(var i = 2; i < userPassHased.length; i++) {
        userPassHased = setCharAt(userPassHased, i, '*');
    }
    userPass.innerText = userPassHased;
}

// Function use later
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
