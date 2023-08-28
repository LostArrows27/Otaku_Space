<div align="center">
  <a href="https://github.com/LostArrows27/Otaku_Space">
    <img src="https://otaku-space.vercel.app/assets/img/logo.png" alt="Logo" width="160" height="160">
  </a>
  <h3>Otaku Space</h3>
<div>Online book store for Otaku</div>
</div>

## About the project
- Otaku Space is an online books store made for Anime's fan (Otaku)  

<img width="900" alt="image" src="https://user-images.githubusercontent.com/63915841/207500327-2664daa3-4871-49ac-8f54-bc78a40fd446.png">

## Demo website + video dem
- See demo website [here](https://otaku-space.vercel.app/);
- See website demo video [here](https://drive.google.com/file/d/1lZDgIPBtA37rxLDSyJ7Jbcxz0bPeVN19/view?usp=sharing)

## Note
- Because our team hosts MySQL on Heroku and the server often encounters errors, sometimes the website might not display completely. If an error occurs, please kindly reload the webpage or watch the demo video above!

## Website Features

- The website includes most of the basic functionalities of an online trading platform with a simple and intuitive database.
1. Login, account registration
2. View products, "like" products
3. Add to cart
4. Checkout from the cart / direct purchase
5. List products for sale
6. Search for products
7. View own shop, view other users' shops
8. Filter products by price, featured, best-selling, and more.

## Technology Highlights
1. Frontend: HTML, CSS, Javascript, JQuery
2. Backend: MySQL (MySQl Workbench), NodeJS, ExpressJS
3. Hosting: Heroku (Database), Vercel (FrontEnd + BackEnd)

## Entity-Relationship Diagram (ERD) for the Database
<img width="900" alt="image" src="https://user-images.githubusercontent.com/97510841/207873522-0e267a18-b3bb-4599-8631-948a7bc970d6.png">

1. Table "users": contains personal information of users. Each user can both list items for sale and make purchases.
2. Table "products": contains information about products such as name, uploader, illustration image link, quantity, and more.
3. Table "carts": stores the products that users have added to their carts.
4. Table "orders": stores information about the buyer and the purchase date.
5. Table "orderdetail": stores detailed information about each user's orders.
6. Table "searchhistory": stores the search history of users whenever they enter a search term and decide to view a specific product.
## THANK FOR VISITTING OUR WEB
