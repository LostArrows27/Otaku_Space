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
            fetch('https://web-database.vercel.app/signup', {
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
                        toast_message({ type: "login", duration: 1000, msg: "Đăng ký tài khoản thành công !", icon: '<i class="fa-solid fa-circle-check"></i>' });
                        setTimeout(() => {
                            window.location.href = "/nologin.html";
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
            fetch('https://web-database.vercel.app/signin', {
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
                        toast_message({ type: "login", duration: 1000, msg: "Đăng nhập thành công !", icon: '<i class="fa-solid fa-circle-check"></i>' });
                        setTimeout(() => {
                            window.location.href = "/nologin.html";
                        }, 1500)
                    }
                })
        }
    });

    Validator({
        form: '#form-3',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#productName', 'Vui lòng điền thông tin'),
            Validator.isRequired('#productPrice', 'Vui lòng điền thông tin'),
            Validator.isRequired('#productFigure', 'Vui lòng điền thông tin'),
            Validator.isRequired('#productCategory', 'Vui lòng điền thông tin'),
            Validator.isRequired('#productSale', 'Vui lòng điền thông tin'),
            Validator.isRequired('#main_image', 'Vui lòng điền thông tin'),
            Validator.isRequired('#sub_image1', 'Vui lòng điền thông tin'),
            Validator.isRequired('#sub_image2', 'Vui lòng điền thông tin'),
            Validator.isRequired('#sub_image3', 'Vui lòng điền thông tin'),
            Validator.isRequired('#sub_image4', 'Vui lòng điền thông tin'),
            Validator.isSalePercent('#productSale', 100, 'Giá trị phải trong khoảng 0-100'),
            Validator.isImageLink('#main_image', 'Vui lòng điền đúng định dạng ảnh'),
            Validator.isImageLink('#sub_image1', 'Vui lòng điền đúng định dạng ảnh'),
            Validator.isImageLink('#sub_image2', 'Vui lòng điền đúng định dạng ảnh'),
            Validator.isImageLink('#sub_image3', 'Vui lòng điền đúng định dạng ảnh'),
            Validator.isImageLink('#sub_image4', 'Vui lòng điền đúng định dạng ảnh')


        ],
        onSubmit: function (data) {
            toast_message({ type: "salenow", duration: 1000,  msg: "Đăng bán thành công" });
            var userId = localStorage.getItem("userid");
            data.ownerName = userId;
            fetch('https://web-database.vercel.app/new-product', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(dataBackEnd => {
                    var info = dataBackEnd[1][0];
                    redirectToProductPageAfterPostProduct(info.id, info.sale_percent, localStorage.getItem("userid"))
                })
        }
    });

})

// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {

                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }

}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.isImageLink = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var re = new RegExp("^(http|https)://", "i");
            return re.test(value) ? undefined : message || 'Vui lòng chèn link ảnh đúng định dạng';
        }
    };
}

Validator.isUserName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var re = /^[a-zA-Z0-9]+$/;
            return re.test(value) ? undefined : message || 'Vui lòng chèn link ảnh đúng định dạng';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.dob = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(0?[1-9]|[12][0-9]|3[01])[- /.]((0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/
            return value.length == min && regex.test(value) ? undefined : message || `Vui lòng nhập đúng định dạng ngày sinh`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

Validator.isSalePercent = (selector, max, message) => {
    return {
        selector: selector,
        test: function (value) {
            return parseInt(value) <= max && parseInt(value) >= 0 ? undefined : message || 'Giá trị không họp lệ';
        }
    }
}
