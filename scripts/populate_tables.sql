# Build the database
CREATE TABLE inventory (
  id BIGINT NOT NULL AUTO_INCREMENT,
  date_stocked DATETIME DEFAULT CURRENT_TIMESTAMP,
  product_id BIGINT NOT NULL,
  stock BIGINT,
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id BIGINT NOT NULL AUTO_INCREMENT, 
  status ENUM('Pending',
    'Awaiting Payment',
    'Awaiting Fulfillment',
    'Awaiting Shipment',
    'Awaiting Pickup',
    'Partially Shipped',
    'Completed',
    'Shipped',
    'Cancelled',
    'Declined',
    'Refunded',
    'Disputed',
    'Verification Required') NOT NULL,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE finishes (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL UNIQUE,
  hex_code varchar(7),
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE sizes (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL UNIQUE,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id BIGINT NOT NULL AUTO_INCREMENT, 
  name varchar(32) NOT NULL,
  finish_id BIGINT,
  size_id BIGINT,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
    FOREIGN KEY (finish_id)
        REFERENCES finishes(id)
        ON DELETE CASCADE,
    FOREIGN KEY (size_id)
        REFERENCES sizes(id)
        ON DELETE CASCADE,
  UNIQUE KEY unique_product (name, finish_id, size_id)
);

CREATE TABLE order_inventory (
  order_id BIGINT NOT NULL,
  inventory_id BIGINT NOT NULL,
    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
    FOREIGN KEY (inventory_id)
        REFERENCES inventory(id)
        ON DELETE CASCADE
);
# End of building the database

# Populate the database
INSERT INTO finishes (name, hex_code) VALUES ('green', '#008000');
INSERT INTO finishes (name, hex_code) VALUES ('purple', '#800080');

INSERT INTO sizes (name) VALUES ('Invisibly Small');
INSERT INTO sizes (name) VALUES ('Galactically Huge');

INSERT INTO products (name, finish_id, size_id) VALUES ('Widget', 1, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget', 1, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget', 2, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget', 2, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Prime', 1, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Prime', 1, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Prime', 2, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Prime', 2, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 1, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 1, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 2, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 2, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Elite', 1, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Elite', 1, 2);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Elite', 2, 1);
INSERT INTO products (name, finish_id, size_id) VALUES ('Widget Elite', 2, 2);

INSERT INTO inventory (product_id, stock) VALUES (1, 2);
INSERT INTO inventory (product_id, stock) VALUES (2, 4);
INSERT INTO inventory (product_id, stock) VALUES (3, 8);
INSERT INTO inventory (product_id, stock) VALUES (4, 16);
INSERT INTO inventory (product_id, stock) VALUES (5, 32);
INSERT INTO inventory (product_id, stock) VALUES (6, 64);
INSERT INTO inventory (product_id, stock) VALUES (7, 128);
INSERT INTO inventory (product_id, stock) VALUES (8, 256);
INSERT INTO inventory (product_id, stock) VALUES (9, 512);
INSERT INTO inventory (product_id, stock) VALUES (10, 1024);
INSERT INTO inventory (product_id, stock) VALUES (11, 2048);
INSERT INTO inventory (product_id, stock) VALUES (12, 4099);
INSERT INTO inventory (product_id, stock) VALUES (13, 8192);
INSERT INTO inventory (product_id, stock) VALUES (14, 16384);
INSERT INTO inventory (product_id, stock) VALUES (15, 32768);
INSERT INTO inventory (product_id, stock) VALUES (16, 65536);
# End of populating the database
