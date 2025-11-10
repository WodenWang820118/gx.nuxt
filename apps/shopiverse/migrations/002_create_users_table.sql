-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    address VARCHAR(500),
    photo_url VARCHAR(1000),
    auth_provider VARCHAR(50) DEFAULT 'email' NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on auth_provider for analytics
CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users(auth_provider);
