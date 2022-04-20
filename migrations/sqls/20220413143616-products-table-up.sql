/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE,
    price INTEGER NOT NULL
)