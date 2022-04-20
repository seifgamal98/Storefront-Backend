/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL
)