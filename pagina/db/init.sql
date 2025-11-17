CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);


INSERT INTO users (email, password) VALUES
('admin@example.com', '123456')
ON CONFLICT (email) DO NOTHING;