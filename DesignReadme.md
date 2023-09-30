
# This readme will describe all the databases, APIs and their purposes. 

## Databases 
### admins
- TThe admins database will contain the information of the admins. For now we will have only one admin.
 - Functions -: 
	 - Approve the restaurants
 - Fields -:
	 - name
	 - username
	 - email
	 - password
	 - role
### customers
 - The customers database will contain the information of the customers. Customers will be able to register and login. Customers don't need any approval from the admin. Customers can follow restaurants and add restaurants to their favorites.
 - Functions -: 
	 - Follow restaurants
	 - Add restaurants to their favorites
	 - Can search for restaurants by their name.
	 - Can view the restaurant's information by clicking on the search results
	 - Can view the restaurant's menu by clicking on the search results etc etc
	 - Can view the restaurants from their favorites list
	 - Can view the restaurants from their following list
	 - Can also save their locations and search for restaurants near them.
	 - Can also use maps to locate their location.

 - Fields -:
	 - name
	 - username
	 - email
	 - password
	 - role
	 - phoneNumber
### favorites
 - The favorites database will contain the information of the restaurants that the customers have added to their favorites list. For now only the users with customer role can access the favorite APIs. Need to disccuss this with the team.
 - Functions -:
 - Fields -:
	 - customer
	 - place_id
### pendingrequests
 - The pending requests database will contain the information of the restaurants that have registered but are not approved yet. Only the users with admin role can access the pending requests APIs. Once the admin approves the restaurant, the restaurant's status will be updated from false to true in the restaurants database and the restaurant will be removed from the pending requests database. The restaurant can only login if the status is true.
- Functions -:
	- 1. To keep track of the pending requests. Will be used by the admin to approve the restaurants.
 - Fields -:
	 - restaurantID
	 - adminID
### restaurants
- The restaurants database will contain the information of the restaurants. Restaurants will be able to register and login. Restaurants will need approval from the admin. Restaurants will be approved only if their information is their on the google places api.
 - Functions -: 
 - Fields -:
	 - name
	 - address
	 - username
	 - email
	 - password
	 - role
	 - phoneNumber
	 - status





# APIs
## Common 

## Accessed by Admin (may or may not be accessed by other user roles)
- To register - POST 
	- /api/admins/
- To login - POST 
	- /api/admins/login
- To get the admin information - GET
	- /api/admins/me
- To approve the restaurants - PUT
	- /api/admins/approve/:id
- To get the pending requests - GET
	- /api/admins/pending

## Accessed by Customer (may or may not be accessed by other user roles)
- To register - POST
	-  /api/customers/
- To login - POST
- /api/customers/login
- To get customer information - GET
	-  /api/customers/me
- To add Favorites - POST
	- /api/favorites/
- To get Favorites - GET
	- /api/favorites/
- To delete Favorites - DELETE
	- /api/favorites/:id



## Accessed by Restaurant (may or may not be accessed by other user roles)
- To register - POST
	-  /api/restaurants/
- To login - POST
	-  /api/restaurants/login
- To get restaurant information - GET
	-  /api/restaurants/me