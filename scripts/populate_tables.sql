# Build the database
CREATE TABLE order_status_enum (
  id BIGINT NOT NULL AUTO_INCREMENT, 
  name varchar(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product_type_enum (
  id BIGINT NOT NULL AUTO_INCREMENT, 
  name varchar(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE customer_order (
  id BIGINT NOT NULL AUTO_INCREMENT, 
  order_status_id BIGINT NOT NULL,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (order_status_id)
    REFERENCES order_status_enum(id)
    ON DELETE CASCADE
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
  product_type_id BIGINT NOT NULL,
  finish_id BIGINT,
  size_id BIGINT,
  in_stock BOOLEAN DEFAULT TRUE,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  serial_number TINYTEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (product_type_id)
    REFERENCES product_type_enum(id)
    ON DELETE CASCADE,
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
  product_id BIGINT NOT NULL,
  FOREIGN KEY (order_id)
      REFERENCES customer_order(id)
      ON DELETE CASCADE,
  FOREIGN KEY (product_id)
      REFERENCES product(id)
      ON DELETE CASCADE
);
# End of building the database

# Populate the database
INSERT INTO order_status_enum (name) VALUES ('Pending');
INSERT INTO order_status_enum (name) VALUES ('Awaiting Payment');
INSERT INTO order_status_enum (name) VALUES ('Awaiting Fulfillment');
INSERT INTO order_status_enum (name) VALUES ('Awaiting Shipment');
INSERT INTO order_status_enum (name) VALUES ('Awaiting Pickup');
INSERT INTO order_status_enum (name) VALUES ('Partially Shipped');
INSERT INTO order_status_enum (name) VALUES ('Completed');
INSERT INTO order_status_enum (name) VALUES ('Shipped');
INSERT INTO order_status_enum (name) VALUES ('Cancelled');
INSERT INTO order_status_enum (name) VALUES ('Declined');
INSERT INTO order_status_enum (name) VALUES ('Refunded');
INSERT INTO order_status_enum (name) VALUES ('Disputed');
INSERT INTO order_status_enum (name) VALUES ('Verification Required');

INSERT INTO product_type_enum (name) VALUES ('Widget');
INSERT INTO product_type_enum (name) VALUES ('Widget Prime');
INSERT INTO product_type_enum (name) VALUES ('Widget Elite');
INSERT INTO product_type_enum (name) VALUES ('Widget EXTREME Edition');

INSERT INTO finish (name, hex_code) VALUES ('green', '#008000');
INSERT INTO finish (name, hex_code) VALUES ('purple', '#800080');

INSERT INTO size (name) VALUES ('Invisibly Small');
INSERT INTO size (name) VALUES ('Galactically Huge');

INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget', 1, 1, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget', 1, 1, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget', 1, 2, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget', 1, 2, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Prime', 2, 1, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Prime', 2, 1, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Prime', 2, 2, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Prime', 2, 2, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Elite', 3, 1, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Elite', 3, 1, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Elite', 3, 2, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget Elite', 3, 2, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget EXTREME Edition', 4, 1, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget EXTREME Edition', 4, 1, 2);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget EXTREME Edition', 4, 2, 1);
INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES ('Widget EXTREME Edition', 4, 2, 2);

# Order 1
INSERT INTO customer_order (order_status_id) VALUES (1);
INSERT INTO order_inventory (order_id, product_id) VALUES (1, 1);
INSERT INTO order_inventory (order_id, product_id) VALUES (1, 2);
INSERT INTO order_inventory (order_id, product_id) VALUES (1, 3);
UPDATE product SET in_stock = false WHERE id = 1;
UPDATE product SET in_stock = false WHERE id = 2;
UPDATE product SET in_stock = false WHERE id = 3;

# Order 2
INSERT INTO customer_order (order_status_id) VALUES (1);
INSERT INTO order_inventory (order_id, product_id) VALUES (2, 10);
INSERT INTO order_inventory (order_id, product_id) VALUES (2, 11);
UPDATE product SET in_stock = false WHERE id = 10;
UPDATE product SET in_stock = false WHERE id = 11;
# End of populating the database
