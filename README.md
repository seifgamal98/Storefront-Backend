# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn dev` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Created the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers(Routes)

Seted up the Express handlers WHICH ARE CALLED THE `ROUTE` FOLDER IN THE PROJECT to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Added JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. Step by Step to test all the project requirments
- Installing all the nessecary packeges etc. jasmine,superset,node,...
- Set up the databases on your point in  an ENV file
   PORT=3000
   NODE_ENV=dev
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=store_dev
   POSTGRES_DB_TEST=store_test
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   BCRYPT_PASSWORD=new-password
   SALT_ROUNDS=10
   SECERT_TOKEN=the-secert-token
   
   
- Creating a config file to take the env variables and Export them when needed   
- Create the TWO databases using POSTGRES with aid from PGadmin    
- Creating diffrent folders such as MODELS,ROUTES,MIDDLEWARE,INTERFACES,MIGRAIONS,and DATABASE
   - MODELS is the folder responsible for holding all the methods that should map to the endpoints
   - ROUTES are the endpoint post,get rquests that are presented in the `REQUIUREMENTS.md`
   - MIDDLEWARE is the folder that contains two important middlewares `authentication`middleware and `errorhandling`middleware
   - INTERFACE folder holdes one interface `ERROR` that is important to the `errorhandling`middleware
   - MIGRATIONS is where the SQL tables UP and DOWN files are created to create the tables and to drop them
   - DATABASE is a folder that consists of one file which is index.ts ,this file funcionality is to take the ENV variables of the the databases 
     used wether the database is the `DEV` or `TEST` database and use them in the there respected use.
- Create 4 tables users,products,orders,productorder
- Create MODELS requests to complete the rquirments such as creating (user,product,order),showing all(users,products,orders),showing one
   (user,product,order by user id)and lastly adding a product to the order asked for in the `REQUIUREMENTS.md`
- Create POST , GET requests to send the data wanted to the endpoints
- Running `npm run migrate` to migrate the tables created to the database , then run `yarn dev` to start the port an server
- Start by in PostMan
   - Creating 2 users `POST` http://localhost:3000/pages/users/ attributes of `email`,`firstname`,`lastname`,`password`
   - Authenticate the users `POST` http://localhost:3000/pages/users/authenticate attributes of `email`,`password`
   - Show one user `GET` http://localhost:3000/pages/users/1 to show the user with id 1
   - Show all users `GET` http://localhost:3000/pages/users/ to show all the users
   - Update the first User `PATCH` http://localhost:3000/pages/users/1 the 1 is the id in addition attributes of `id`,`email`,`firstname`,
     `lastname`, `password` are sent as the updated attributes
   - Delete the second User `DELETE` http://localhost:3000/pages/users/2 the 2 in the url is the id of the wanted deleted user
   - Creating 2 products with the token taken of the users `POST` http://localhost:3000/pages/products/ attributes of `price,`name`
   - Show all products `GET` http://localhost:3000/pages/products/
   - Show one product `GET` http://localhost:3000/pages/products/1 to show the product with id 1
   - Update the first product `PATCH` http://localhost:3000/pages/products/1 the 1 is the id in addition attributes of `id`,`prce`,`name`,
     are sent as the updated attributes
   - Delete the second product `DELETE` http://localhost:3000/pages/products/2 the 2 in the url is the id of the wanted deleted product
   - Create an 2 new orders `POST` http://localhost:3000/pages/orders/ attributes of `status` ,`usersid` where the user id is a users previously created 
   - Add the two products product to an exsisting first order `POST` http://localhost:3000/pages/orders/1/addproduct where the 1 is order id `1` and 
     attributes of `quantity` and `productid` whre the product id is a product priviously created.
   - Show all the orders using `GET` http://localhost:3000/pages/orders/ to show all orders
   - Remove the any desired product of the first order `DELETE` http://localhost:3000/pages/orders/1/removeproduct/2 in this url the 1 stands for 
     the orderid and the 2 stands for the productid 
   - Show order a specific order using the userid as required in the `REQUIUREMENTS.md` `GET` http://localhost:3000/pages/orders/1 where it will show 
     all the products in the required order givin in the url
   - Update the second order attributes by `PATCH` http://localhost:3000/pages/orders/2 where the 2 stands for the orderid desired to update with 
     attributes as `id`,`status`,`userid`
   - Delete the second order by `DELETE` http://localhost:3000/pages/orders/2 where the 2 stands for the orderid desired to be deleted
- Any error in any givin time will be handled and presented in the api endpoint using the `errorhandling`middleware 
- Switchinng the database to the store_test by formating in the package.json `test`: `set NODE_ENV=test && tsc && db-migrate up --env test && tsc 
   && jasmine && db-migrate reset --env test`
- As for testing testing is divided into to folders both called tests one in the routs folder to test the endpoints,the other is in the 
  models to test the models. Each folder contains three files testing each corner of the project in the endpoint section there is `userSpec`,`productSpec`
  ,`orderSpec`. In the model section there is `userRouteSpec`,`productRouteSpec`,`orderRouteSpec`.
- Run `yarn test` to test all the tests written to test all the models and endpoint a total of 50 specs.    
