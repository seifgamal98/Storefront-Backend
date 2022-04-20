/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(60),
    userid bigint REFERENCES users(id)
);