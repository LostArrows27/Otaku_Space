# Otaku space an online bookstore for everyone 
- 1 sản phẩm của nhóm 5 - INT2211_234
<img width="900" alt="image" src="https://user-images.githubusercontent.com/63915841/207500327-2664daa3-4871-49ac-8f54-bc78a40fd446.png">

# Link deploy web: <a  style="font-size:40px;" href="https://shopee-web-clone-six.vercel.app/nologin.html" target="_blank">Otaku space</a>

# Link video demo: <a  style="font-size:40px;" href="https://drive.google.com/file/d/1lZDgIPBtA37rxLDSyJ7Jbcxz0bPeVN19/view?usp=sharing" target="_blank">Demo </a>

Lưu ý: Do nhóm mình host MySQL bên Heroku và server thường lỗi nên đôi khi web sẽ không hiển thị hết. Nếu lỗi vui lòng các bạn reload lại web hoặc xem video demo bên trên !

# Web có hầu hết các chức năng cơ bản của một sàn giao dịch online với database đơn giản và dễ hiểu
1. Đăng nhập, đăng ký tài khoản
2. Xem sản phẩm, "like" sản phẩm
3. Thêm vào giỏ hàng
4. Thanh toán từ giỏ hàng / mua trực tiếp
5. Đăng bán sản phẩm
6. Tìm kiếm sản phẩm 
7. Xem shop bản thân, xem shop người dùng khác
8. Lọc sản phẩm theo giá, nổi bật, bán chạy, ....



# Công nghệ sử dụng
1. Frontend: HTML, CSS, Javascript, JQuery
2. Backend: MySQL (MySQl Workbench), NodeJS

# Biểu đồ mô hình quan hệ cho Cơ Sở Dữ Liệu
<img width="900" alt="image" src="https://user-images.githubusercontent.com/97510841/207873522-0e267a18-b3bb-4599-8631-948a7bc970d6.png">

1. Bảng users --> người dùng. Chứa thông tin cá nhân người dùng. Mỗi người dùng có thể đăng bán và mua hàng
2. Bảng products --> sản phẩm. Chứa cá thông tin của sản phảm như tên, người đăng, link ảnh minh họa, số lượng, .....
3. Bảng carts --> giỏ hàng. Lưu những sản phẩm người dùng lưu vào giỏ hàng
4. Bảng orders --> đơn hàng. Lưu giữ thông tin người mua và ngày mua
5. Bảng orderdetail --> Lưu trữ thông tin chi tiết của đơn hàng từng người dùng
6. Bảng searchhistory --> lưu giữ lịch sủ tìm kiếm của người dùng mỗi khi gõ vào phần tìm kiếm và quyết định xem 1 sản phẩm gì đó

# THANK FOR VISITTING OUR WEB
