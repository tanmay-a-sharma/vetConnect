# Routes = Handles all the routing
# Controller = Controls the intercommunication 
# Middleware = Functions to handle the request/errors
# Config = Configs for Databases, etc etc
# Model = Models for our tables in Mongoose database

# We will be using async handler => async, await , with our mongoDB.

# We are using Bcrypt js to hash the passwords and JWT to authenticate
# The jwt token is signed using ID for each user. 
<!-- Overview  -->
<!-- 
    If the following is our get request with it's response 

    router.get('/api/menu', (req,res) => { 
        res.status(200).json({"message" : 'Get Menu'})
    })

    We have cleaned up our code in the following manner ==>
        ==> All the incoming request will be read by our Server.js and redirected to proper Route file.

        ==> Our Route files will perform the requests such as get/post/put/delete by calling the corresponding functions from the Controller.

        ==> The Controller will then read the response and perform the function to provide the response accordingly.

        To summarize :
        Server.js ==> Redirects the requests to the proper routs ==> '/api/menu'
        Route.js ==> Responds to those requests by calling the appropriate Controller ==> 'Get/Post/Put/Delete'
        Controller.js ==> Carries out the requests and forms a response accordingly ==> (req,res) => {}

 -->


<!-- #Routes 
    for each functionality, we will have a separate route file in our routes folder just to have a proper file structure. 

    => Menu - menuRoutes.js  
    -->

<!-- #Controllers 
    Instead of having our functions inside the body of the requests in the route files, we will have a controller dedicated to them that will handle those functions. 

    => Menu - menuController.js  
    -->



        

 



