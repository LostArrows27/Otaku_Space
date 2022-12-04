document.addEventListener('DOMContentLoaded', function () {
    Validator({
        form: '#form-1',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
            Validator.isUserName('#username', 'Vui lòng nhập tên đăng nhập đầu đủ'),
            Validator.isImageLink('#img'),
            Validator.minLength('#username', 6),
            Validator.minLength('#fullname', 4),
            Validator.minLength('#password', 6),
            Validator.dob('#dob', 10),
            Validator.isRequired('#password_confirmation'),
            Validator.isConfirmed('#password_confirmation', function () {
                return document.querySelector('#form-1 #password').value;
            }, 'Mật khẩu nhập lại không chính xác')
        ],
        onSubmit: function (data) {
            fetch('http://localhost:5000/signup', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(myData => {
                    if (myData.exist == true) {
                        var inputEle = document.querySelector('#signup-input');
                        inputEle.classList.add('invalid');
                        inputEle.querySelector('.form-message').textContent = "Tài khoản đã tồn tại !"
                    } else {
                        localStorage.setItem("login", "success");
                        localStorage.setItem("userid", data.username);
                        localStorage.setItem("password", data.password);
                        localStorage.setItem("fullname", data.fullname);
                        localStorage.setItem("dob", data.dob);
                        localStorage.setItem("img", data.img);
                        console.log(localStorage.getItem("login"));
                        console.log(localStorage.getItem("userid"));
                        console.log(localStorage.getItem("password"));
                        console.log(localStorage.getItem("fullname"));
                        console.log(localStorage.getItem("dob"));
                        console.log(localStorage.getItem("img"));
                        toast_message({ type: "login", duration: 1000, msg: "Đăng ký tài khoản thành công !", icon: '<i class="fa-solid fa-circle-check"></i>'});
                        setTimeout(() => {
                            window.location.href = "no_login.html";
                        }, 1500)
                    }
                })

        }
    });
    Validator({
        form: '#form-2',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isUserName('#usernameLogIn', 'Vui lòng nhập tên đăng nhập đầu đủ'),
            Validator.isRequired('#passwordLogIn', 'Vui lòng nhập mật khẩu'),
        ],
        onSubmit: function (data) {
            fetch('http://localhost:5000/signin', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(myData => {
                    if (myData == "false") {
                        var inputEle = document.querySelector('#login-input');
                        inputEle.classList.add('invalid');
                        inputEle.querySelector('.form-message').textContent = "Tài khoản hoặc mật khẩu sai !"
                    } else {
                        console.log(myData);
                        localStorage.setItem("login", "success");
                        localStorage.setItem("userid", data.usernameLogIn);
                        localStorage.setItem("password", data.passwordLogIn);
                        localStorage.setItem("fullname", myData[0].user_nickName);
                        localStorage.setItem("dob", myData[0].dob.split('T')[0].split('T')[0].split("-").reverse().join("/"));
                        localStorage.setItem("img", myData[0].image_profile);
                        console.log(localStorage.getItem("login"));
                        console.log(localStorage.getItem("userid"));
                        console.log(localStorage.getItem("password"));
                        console.log(localStorage.getItem("fullname"));
                        console.log(localStorage.getItem("dob"));
                        console.log(localStorage.getItem("img"));
                        toast_message({ type: "login", duration: 1000, msg: "Đăng nhập thành công !", icon: '<i class="fa-solid fa-circle-check"></i>'});
                        setTimeout(() => {
                            window.location.href = "no_login.html";
                        }, 1500)
                    }
                })
        }
    });
})