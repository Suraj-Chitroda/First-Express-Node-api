# First-Express-Node-api

A simple basic Express api for managing user data like Name, Password and Profession.

## Routes

This express api has 5 Routes  

`/allUsers`  
This is a get request for get All user as JSON  

`/id/4`  
This is a get request for access the user data by Id  

`/add`  
A Post resquest for adding new user data  
It takes form data are id, name, password, profession

`/modify`  
A Post resquest for updating the existing user  
It takes form data are id, name, password, profession

`/delete`  
A Post resquest for deleting the existing user  
It takes form data is id

