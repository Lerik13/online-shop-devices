# Online Store of Electronic Devices. 
Client-Server app for marketing purposes.
On the main page, customer can filter devices by type and brand (+pagination).
An authorized user can add devices to his shopping cart and mark a rating on the device-info page.
By clicking on the basket user can observe his shopping cart list with the possibility to delete devices from his shopping cart.
Admin user has 3 main functionality: add new type, add new brand or add new device.
```
test user: user@user.com, password: user123
admin: admin@admin.ca, password: admin123
```
using stack of technologies: PERN: PostgreSQL + express + React js + Node.js

State-management: MobX

using 2 types of JWT: access-token(live 30 mins) + refresh-token (save in cookie and live longer: 30 days, use it if acces-token is expired in user's browser)

DB Schema:<br>
![DB Schema](https://github.com/Lerik13/online-shop-devices/blob/main/DB_schema.jpg?raw=true "DB Schema")

### Client Functionality
1. Register User (advanced authorization: send activation link to user's email for activation account)
![Registration](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/0_register.jpg?raw=true "Registration")
2. Login/Logout (Saving JWT-token in user's Local Storage)<br>
![Authorization](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/0_login.jpg?raw=true "Authorization")
3. Main page - Filter devices by type and brand (by default show all) + Pagination<br>
![Catalog_devices](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/1_shop.jpg?raw=true "Catalog")
4. Device-info page 
  - Rating of device (set authorized user's rating for device + update average rating for device)
  - Add device to basket<br>
![Device_info](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/2_device.jpg?raw=true "Device")
5. Shopping Cart<br>
![Basket](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/3_basket.jpg?raw=true "Basket")
6. Admin dashboard (for user with role='ADMIN'): Add type, Add brand, Add device<br>
![Admin2](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/5_admin.jpg?raw=true "Admin panel 2")
![Admin3](https://github.com/Lerik13/online-shop-devices/blob/main/screenshots/6_admin.jpg?raw=true "Admin panel 3")

### Developing details
#### Backend libs:
- express -- Express-framework for creating web-app using NodeJS
- pg, pg-hstore -- library for managing DB PostgreSQL
- sequelize -- ORM - technology for linking program code with a database
- cors -- to send requests from the browser, to access the server
- bcryptjs -- create hash passwords
- jsonwebtoken -- generate web-token for autontification in client-side
- jwt-decode -- parse the token that came from server
- uuid -- get uniq id
- express-fileupload -- upload files to Server
- cookie-parser -- work with cookies
- nodemailer -- work with email
- nodemon (dependency) -- constantly watch server.js, so we don't need to restart server

#### Frontend libs:
  - react, react-dom
  - react-router-dom -- page navigation
  - mobx -- State Manager
  - mobx-react-lite -- to link mobX with react functional components
  - axios -- for async http-queries
  - react-bootstrap, bootstrap -- CSS library

### Deploying
#### set Environment Variables:
1. MongoDB database URI (DB_URL)
2. JWT secret (JWT_SECRET)
3. path in server for uploading user's files (FILE_PATH)
4. path in server for static files, like avatars (STATIC_PATH)
