/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
CREATE TABLE productorder(
     id SERIAL PRIMARY KEY,
     quantity INTEGER,
     orderid bigint REFERENCES orders(id),
     productid bigint REFERENCES products(id)
);