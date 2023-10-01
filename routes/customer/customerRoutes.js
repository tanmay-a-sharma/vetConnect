const express = require('express')
const path = require('path');

const bodyParser = require('body-parser');

router.use(bodyParser.json()); 

const router = express.Router()
const { registerCustomer, loginCustomer, getMe, getMatchedCompanies} = require('../../controllers/customerController')
const { protectCustomer } = require('../../middleware/customerAuthMiddleware')


// get basic regstration html page 
router.get('/', (req, res) => {
    res.sendFile('header.html', { root: path.join(__dirname, '../../views') });

});


// get data from user when they select an option from drop down 
// router.post('/dropdown', (req, res) => {
//     console.log(req.body.myData); // This will log "exampleData" or whatever you sent from the frontend

    

//     // Sending back a response to the frontend
//     res.json({
//         message: 'Data received and processed!'
//     });
// });

router.post('/dropdown', findMatchedCompanies) // returns the matching companies

router.get('/home', (req, res) => {
    res.sendFile('landing.html', { root: path.join(__dirname, '../../views') })
});

router.post('/', registerCustomer) // Adding a customer ==> registration
router.post('/login', loginCustomer) // authenticate a customer ==> login
router.get('/me', protectCustomer, getMe) // get the customer data ==> login // Added protect middleware, so before doing get me it will first verify the token using the protect function
// router.post('/profile', protectCustomer, updateMe)  
// router.post('/callrestaurant', protectCustomer, pendingCall)

module.exports = router

