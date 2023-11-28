
-- Create the 'atlan' database
CREATE DATABASE atlan;

-- Connect to the 'atlan' database
\c atlan

-- Create the 'client_income_data' table
CREATE TABLE client_income_data (
    client_id SERIAL PRIMARY KEY,
    client_email VARCHAR(255),
    client_name VARCHAR(255), 
    income_per_annum FLOAT,
    savings_per_annum FLOAT,
    mobile_number VARCHAR(15)
);






