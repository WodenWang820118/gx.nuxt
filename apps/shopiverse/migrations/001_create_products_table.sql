-- Shopiverse Database Migration for Neon PostgreSQL
-- Run this SQL script in your Neon database console to create the required tables

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  image VARCHAR(1000),
  category VARCHAR(100),
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  price INTEGER NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Verify the table was created successfully
SELECT 'Products table created successfully!' AS status;
SELECT * FROM products LIMIT 1;
