// console.log('Hello world')
const express = require("express");
const path = require('path');
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
console.log(process.env.PORT);
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

connectDB(); // Connecting the DB ==> connected here, so that can be used anywhere now in the file
const app = express();

// // Cors is used to allow the frontend to access the backend
// const cors = require("cors");
// const { getPlaceDetails } = require("./services/api-requests");
// app.use(cors());

// API Requests are handles in routes folder in each file using express

// Some middlewares
// app.use(cors())
app.use(express.json()) // Used to parse json
app.use(express.urlencoded({extended: false})) // We are sending data in this format in Postman





//We could have called all the requests here but it won't be a good design
// app.get('/api/menu', (req,res) => {
//     // res.send('Get Menu') // Normal Html data
//     res.status(200).json({"message" : 'Get Menu'}) // JSOn data // status will be 200 if successful, as we are setting the status ourselves
// })
//Instead
// We use the following route to fetch the following file from the given location,
// app.use("/api/menu", require("./routes/menuRoutes"));
// app.use("/api/favorites", require("./routes/favoritesRoutes"));



// Customer registration and login
app.use("/api/customers", require("./routes/customer/customerRoutes"));



// Normal user profile view // Will be unprotected and will show only somethings.

// app.use("/api/users/", require("./routes/unprotectedRoutes/profileRoutes"));


// middleware

app.use(errorHandler); // overwrites default

app.listen(port, () => console.log(`Server started on port ${port}`));

// The admins database will contain the information of the admins. For now we will have only one admin.
// Functions of the admin:
// 1. Approve the restaurants

// The customers database will contain the information of the customers. Customers will be able to register and login. Customers don't need any approval from the admin. Customers can follow restaurants and add restaurants to their favorites.
// Functions of the customers:
// 1. Follow restaurants
// 2. Add restaurants to their favorites
// 3. Can search for restaurants by their name.
// 4. Can view the restaurant's information by clicking on the search results
// 5. Can view the restaurant's menu by clicking on the search results etc etc
// 6. Can view the restaurants from their favorites list
// 7. Can view the restaurants from their following list
// 8. Can also save their locations and search for restaurants near them.
// 9. Can also use maps to locate their location.

// it contains the following fields:
// 1. name
// 2. email
// 3. password
// 4. username
// 5. role
// 6. phoneNumber
// 7. address
// 8. status

// The restaurants database will contain the information of the restaurants. Restaurants will be able to register and login. Restaurants will need approval from the admin. Restaurants will be approved only if their information is their on the google places api.
// Functions of the restaurants:
// 1. To be  discuss

// The favorites database will contain the information of the restaurants that the customers have added to their favorites list. For now only the users with customer role can access the favorite APIs. Need to disccuss this with the team.
// Functions of the favorites:
// 1. To be discussed

// The pending requests database will contain the information of the restaurants that have registered but are not approved yet. Only the users with admin role can access the pending requests APIs. Once the admin approves the restaurant, the restaurant's status will be updated from false to true in the restaurants database and the restaurant will be removed from the pending requests database. The restaurant can only login if the status is true. \
// Functions of the pending requests:
// 1. To keep track of the pending requests. Will be used by the admin to approve the restaurants.

// APIS accessed by the admin:
// 1. To approve the restaurants - PUT /api/admins/approveRestaurant
// 2. To view the pending requests - GET /api/admins/pendingRequests
// 3. To login - POST /api/admins/login
// 4. To register - POST /api/admins/
