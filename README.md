#Sample REST APIs

The app is currently host at the following URL:
https://lattis-api.herokuapp.com

## *Steps to Run the app in local environment*
- Clone the Repo
- setup and start a MySQL db
- set following value .env file
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - JWT_SECRET
- run *yarn* command
- run *yarn build*
- to start with nodemon run *yarn start:babel-dev*
- to start with build files run *yarn start*

## API END POINTS

### Note : this app uses application/x-www-form-urlencoded for apis.

### /signup
- METHOD: POST
- body params 
  - username - String, Required
  - birthDate - Date (yyyy-mm-dd), Required
  - userPassword - String, Required
  - firstName - String, Required
  - lastName - String, Required
  
### /login
- METHOD: POST
- body params 
  - username - String, Required 
  - userPassword - String, Required

### *ALL END POINT BELOW REQUIRED AUTHENTICATION TOKEN IN FORM OF BEARER TOKEN*

### /user
- METHOD: PUT/PATCH
  - body params 
    - birthDate - Date (yyyy-mm-dd), Optional
    - firstName - String, Optional
    - lastName - String, Optional

- METHOD: DELETE

- METHOD: GET
  - get method on /user without any query params will list all user
  - Query params 
    - userId (providing userId will fetch user with the given userId)
    - username (providing username will fetch user with the given username)
  - Note: Provide any one of the query params

### /me
- METHOD: GET
  - This user end point fetches details of current user.

### /lock
- METHOD: POST
  - body params 
    - lockName - String, Required 

- METHOD: PATCH
  - body params 
    - oldLockName - String, Required 
    - newLockName - String, Required 

- METHOD: POST
  - body params 
    - lockName - String, Required 

- METHOD: GET
  - get method on /lock without any query params will list all locks logged in user.
  - Query params 
    - lockId (providing lockId will fetch user with the given lockId)
    - macId (providing macId will fetch user with the given macId)
  - Note: Provide any one of the query params
