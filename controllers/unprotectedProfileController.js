const asyncHandler = require('express-async-handler')


const Customer = require('../models/customerModel');
const Restaurant = require('../models/restaurantModel');
const Favorite = require('../models/favoritesModel');
// Functions 

// All the req/res part 

// Function 1 

//  @desc Get menu 
//  @route GET /api/menu
//  @access Private

const getProfile = asyncHandler(async (req,res) => {
    username = req.params.username;
    const customer = await Customer.findOne({username}) 
    
    if (customer) {
        const favorites = await Favorite.find({customer: customer._id})
        respone = {customer ,favorites}
        res.status(200).json(respone)
    }
    else{
        // console.log("CHeccking restaruant")
        const restaurantExists = await Restaurant.findOne({username});
        if (restaurantExists) {
            // console.log("Restaurant exists")
            res.status(200).json(restaurantExists)
        }
        else{
            res.status(404)
            throw new Error('User not found')
        }
    }
})


// //  @desc Create menu 
// //  @route POST /api/menu
// //  @access Private
// const createMenu = asyncHandler(async (req,res) => { 
//     // We can deal with body here 
//     if(!req.body.text) { // text is the key we are expecting from our defined case.
//         res.status(400)
//         throw new Error('Please add a text field') // This now shows on postman in the form of JSOn , rather than sending a html error file in default
//     }
//     console.log(req.body)
//     res.status(200).json({"message" : 'Create Menu'}) 
// })


//  @desc Update menu 
//  @route PUT /api/menu/:id
//  @access Private
// const updateMenu = asyncHandler(async (req,res) => {  // We need a id to update that particular item only/data only
//     res.status(200).json({"message" : `Update menu item ${req.params.id}`}) // backticks, so as to include the variables (Javascript)
// })

  
// //  @desc Delete menu 
// //  @route  DELETE /api/menu/:id
// //  @access Private
// const deleteMenu = asyncHandler(async (req,res) => { 
//     res.status(200).json({"message" : `Delete menu item ${req.params.id}`})
// })

// Export the functions 

module.exports = {
    getProfile
}