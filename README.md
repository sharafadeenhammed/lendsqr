# Lendsqr backend api test

## Configuration

`// edit the congig.env file for the correct enviroment variable `

### add the following values to the config.env in the root of the folder

`PORT = port number`
`DATABASE_USERNAME = "user",`
`DATABASE_PASSWORD = "password"`
`DATABASE_NAME = "database name"`
`SALT = "bcrypt salt"`
`JWT_TOKEN_EXPIRES = "json web token expiration duration"`
`JWT_SECRET = "json web token secret"`
`

## Setup

Run `node migration --migrate-dbs` to migrate database

Run `node migration --migrate-tbs` to migrate database tables

Run `npm start` to start the application

## Documentation

#### Postman documentation link

https://documenter.getpostman.com/view/20324776/2s93RNyEuB

#### Service Link

https://lendsqr-vzjz.onrender.com
