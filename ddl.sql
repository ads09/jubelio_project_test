-- Table: Product
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(10) UNIQUE NOT NULL,
    image VARCHAR(225),
    price FLOAT NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0
);

-- Table: Adjustment Transaction
CREATE TABLE adjustment_transaction (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(10) not null,
    qty INTEGER,
    amount DECIMAL(10, 2),
    FOREIGN KEY (sku) REFERENCES product (sku) ON DELETE CASCADE
);

-- Add index to 'id' column in 'product' table
CREATE INDEX idx_product_id ON product (id);

-- Add index to 'sku' column in 'product' table
CREATE INDEX idx_product_sku ON product (sku);

-- Add index to 'id' column in 'adjustment_transaction' table
CREATE INDEX idx_adjustment_transaction_id ON product (id);

-- Add index to 'sku' column in 'adjustment_transaction' table
CREATE INDEX idx_adjustment_transaction_sku ON adjustment_transaction (sku);