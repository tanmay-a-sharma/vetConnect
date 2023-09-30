const mongoose = require('mongoose')

// all the user-required fields
const userProfileSchema = mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId, // Id type
            required: true,
            ref: 'User' // references our user model, so each user has a profile.
        },
        text: {
            type: String, 
            required: [true, 'Please add a text'],
        }, 
        // Can add favorites and other profile related things here. 
        
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)