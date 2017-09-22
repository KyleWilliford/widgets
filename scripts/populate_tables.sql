# Build the database
CREATE TABLE inventory (
  id BIGINT NOT NULL AUTO_INCREMENT,
  date_stocked DATETIME DEFAULT CURRENT_TIMESTAMP,
  product_id BIGINT NOT NULL,
  stock BIGINT,
  PRIMARY KEY (id)
);

CREATE TABLE customer_order (
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

CREATE TABLE finish (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL UNIQUE,
  hex_code varchar(7),
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE size (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL UNIQUE,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id BIGINT NOT NULL AUTO_INCREMENT, 
  name varchar(32) NOT NULL,
  finish_id BIGINT,
  size_id BIGINT,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
    FOREIGN KEY (finish_id)
        REFERENCES finish(id)
        ON DELETE CASCADE,
    FOREIGN KEY (size_id)
        REFERENCES size(id)
        ON DELETE CASCADE,
  UNIQUE KEY unique_product (name, finish_id, size_id)
);

CREATE TABLE order_inventory (
  order_id BIGINT NOT NULL,
  inventory_id BIGINT NOT NULL,
  quantity BIGINT NOT NULL,
    FOREIGN KEY (order_id)
        REFERENCES customer_order(id)
        ON DELETE CASCADE,
    FOREIGN KEY (inventory_id)
        REFERENCES inventory(id)
        ON DELETE CASCADE
);
# End of building the database

# Populate the database
INSERT INTO finish (name, hex_code) VALUES ('green', '#008000');
INSERT INTO finish (name, hex_code) VALUES ('purple', '#800080');

INSERT INTO size (name) VALUES ('Invisibly Small');
INSERT INTO size (name) VALUES ('Galactically Huge');

INSERT INTO product (name, finish_id, size_id) VALUES ('Widget', 1, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget', 1, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget', 2, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget', 2, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Prime', 1, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Prime', 1, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Prime', 2, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Prime', 2, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 1, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 1, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 2, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget EXTREME Edition', 2, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Elite', 1, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Elite', 1, 2);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Elite', 2, 1);
INSERT INTO product (name, finish_id, size_id) VALUES ('Widget Elite', 2, 2);

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
INSERT INTO inventory (product_id, stock) VALUES (12, 4096);
INSERT INTO inventory (product_id, stock) VALUES (13, 8192);
INSERT INTO inventory (product_id, stock) VALUES (14, 16384);
INSERT INTO inventory (product_id, stock) VALUES (15, 32768);
INSERT INTO inventory (product_id, stock) VALUES (16, 65536);

INSERT INTO customer_order (status) VALUES ('Pending');
INSERT INTO order_inventory (order_id, inventory_id, quantity) VALUES (1, 1, 1);
INSERT INTO order_inventory (order_id, inventory_id, quantity) VALUES (1, 2, 2);
INSERT INTO order_inventory (order_id, inventory_id, quantity) VALUES (1, 3, 4);
# End of populating the database
