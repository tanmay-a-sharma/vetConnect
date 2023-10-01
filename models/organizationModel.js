const mongoose = require('mongoose')

// all the user-required fields
const organizationSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please add a name']
    },
    description: {
        type: String, 
        required: [true, 'Please add a description'],
        unique: false
    },
    tag: {
        type: String, 
        required: [true, 'Please add an tag'],
        unique: false
    },
    contact: {
        type: String, 
        required: [true, 'Please add contact information']
    },
    // role: {
    //     type: String, 
    //     required: [true, 'Please add a role']   // default role will be send using the customer controller
    // },
    // phoneNumber: {  // Test on frontend whether the input is in number or not.
    //     type: Number, 
    //     required: [true, 'Please add a phone number']
    // }
    
    // I need to further add role, phone number here later
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('Organizaton', organizationSchema)