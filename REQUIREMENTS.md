# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- Delete [token required]
- Update [token required]

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]
- Delete [token required]
- Update [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- Delete [token required]
- Update [token required]
- Create [token required]
- Add Product to Order [token required]
- Remove Product from Order [token required] 

## Data Shapes
#### Product
-  id [String VARCHAR] [STRING SERIAL PRIMARY KEY]
- name [String VARCHAR]
- price [Number INTEGER]

#### User
- id [STRING SERIAL PRIMARY KEY]
- email [ UNIQUE ] [String VARCHAR]
- firstName [String VARCHAR]
- lastName [String VARCHAR]
- password [ HASHED ] [String VARCHAR]

#### Orders
- id [STRING SERIAL PRIMARY KEY]
- user_id[ STRING SERIAL PRIMARY KEY ] [FORIGN KEY]
- status of order (active or complete) [String VARCHAR]
#### productorder
- id [STRING SERIAL PRIMARY KEY]
- quantity [Number INTEGER]
- id of the order wanted [ STRING SERIAL PRIMARY KEY ] [FORIGN KEY]
- id of the product wanted [ STRING SERIAL PRIMARY KEY ] [FORIGN KEY]
