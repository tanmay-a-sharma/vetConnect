const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
const Organization = require("../models/organizationModel")


//  @desc Register new users
//  @route Post /api/users
//  @access Public
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body; // getting all the fields

  // Can make this more specific for each missing field
  if (!name || !email || !password || !username) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // Check if user exists
  const customerExists = await Customer.findOne({ email }); // email is unique and could be used to check if user exists \\ username is also unique \\  could also use phone number
  if (customerExists) {
    res.status(400);
    throw new Error("Customer already exists");
  }

  // Hashing the password

  const salt = await bcrypt.genSalt(10); // to hash the pass
  const hashPassword = await bcrypt.hash(password, salt);

  // Create user
  const customer = await Customer.create({
    name,
    email,
    username,
    password: hashPassword,
    // role: "customer", // default role
    // phoneNumber,
  });

  if (customer) {
    res.status(201).json({
      // everything is OK and we send the following values back
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
      username: customer.username,
      // role: customer.role,
      // phoneNumber: customer.phoneNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
  // res.json({message: 'Register User' })
});


//  @desc Register new organizations
//  @route Post /api/registerOrganization
//  @access Public
const registerOrganization = asyncHandler(async (req, res) => {

  // console.log('registerOrganization route hit');

  const { name, description, tag, contact } = req.body; // getting all the fields
  console.log(req.body);
  if (!name || !description || !tag || !Array.isArray(tag) || tag.length === 0 || !contact) {
    res.status(400);
    throw new Error("Please add all the fields");
}
  
  // Check if organization exists
  const organizationExists = await Organization.findOne({ name }); // name is unique and could be used to check if user exists
  if (organizationExists) {
    res.status(400);
    throw new Error("Organization already exists");
  }

  const organization = await Organization.create({
    name,
    description,
    tag,
    contact,
  });


  console.log(organization);
  if (organization) {
    res.status(201).json({
      // everything is OK and we send the following values back
      name: organization.name,
      description: organization.description,
      tag: organization.tag,
      contact: organization.contact,
      
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
  });
  




//  @desc Authenticate a user
//  @route Post /api/users/login
//  @access Public
const loginCustomer = asyncHandler(async (req, res) => {
  const { username, password } = req.body; // getting the information from the frontend

  // First verify that the user exists
  const customer = await Customer.findOne({ username }); // email is unique and could be used to check if user exists \\ username is also unique \\  could also use phone number

  // Comparing the passwords using their hashed values
  if (customer && (await bcrypt.compare(password, customer.password))) {
    // sending back the following fields after login successful
    res.json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
      username: customer.username,
      // role: customer.role,
      // phoneNumber: customer.phoneNumber,
    });
  } else {
    // Password incorrect or customer not found or some other error
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  // res.json({message: 'Login User' })
});

//  @desc Get user data
//  @route Get /api/users/me
//  @access Public
const getMe = asyncHandler(async (req, res) => {
  // Since we are getting the req.user,  userid from our authMiddleware,we can use it here since it's redirecting us here.
  const { _id, name, email } = await Customer.findById(req.customer.id); // We can all fetch others fields

  res.status(200).json({
    id: _id,
    name, // if we want to show name:name, can just write name
    email,
  });
  // res.json({message: 'User Data' })
});




//  @desc Get user tag
//  @route Get /api/checkMatching
//  @access Public
const getMatchedCompanies = asyncHandler(async (req, res) => {
  let { tag } = req.query;  // Getting tag from query parameters

  // If tag is not an array, convert it
  if (tag && !Array.isArray(tag)) {
      tag = Array.isArray(tag) ? tag : [tag];
  }

  if (!tag || tag.length === 0) {
      res.status(400);
      throw new Error("Tags must be an array and not empty");
  }

  console.log('Received tags:', tag);

  const matchedCompanies = await Organization.find({ tag: { $in: tag } });

  if (matchedCompanies.length === 0) {
      res.status(404); // Not found
      throw new Error("No companies found with the given tags");
  } else {
      res.status(200).json(matchedCompanies); // Send matched companies as response
  }
});



// To generate a JWT token
const generateToken = (id) => {
  // Our token will be payload_id(userID) + secret + expireDuration
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getMe,
  registerOrganization,
  getMatchedCompanies,
  // updateMe,
  // pendingCall,
};


