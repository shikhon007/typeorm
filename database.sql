CREATE TABLE user_manager (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    userName VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);