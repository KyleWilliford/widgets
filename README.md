# Widgets React / Express Sample App

# Browser Support

This application has only been tested with Chrome Version 61.0.3163.100 (Official Build) (64-bit)

# Live Site
~Website: http://ec2-184-72-124-34.compute-1.amazonaws.com:3000/~ (Offline)

~Server (for REST calls): http://ec2-184-72-124-34.compute-1.amazonaws.com:3001/~ (Offline)

# Requirements
- npm 5.4.x+
- react-scripts 1.0.x
- node 8.4.x+
- MySQL 5.7.x+
- Various other node libraries will be installed in the next step

## Install npm

`npm` is used to build and run this project.
https://docs.npmjs.com/getting-started/installing-node

# Database (MySQL)

## Note
The following scripts have not been tested with SQL servers other than MySQL Server 5.7.x

## Setup
Install mysql-server. This will vary depending on the environment. Refer to https://dev.mysql.com/doc/refman/5.7/en/installing.html for more information.

<b>Make note of the root password that you set while installing the server.</b> You will need it in the following steps.

### After MySQL Server Installation

`$ mysql -u root -p` will prompt for a password. This is the root password you used while installing the server.

Run the script provided in `widgets/scripts/db_setup.sql`. These statements can be run all at once (by copying and pasting to the command line, executing the file in the database, etc.), but <b>these must be run in their provided order</b>.

#### Create Schema, Tables, Populate some sample data
Run the script provided in `widgets/scripts/populate_tables.sql`. These statements can be run all at once (by copying and pasting to the command line, executing the file in the database, etc.), and some statements must be run in their provided order.

# Install dependencies
`$ cd widgets`

`$ npm i`

`$ cd widgets-front`

`$ npm i`

`$ npm i react-scripts`

# Start the backend/Express server
`$ cd <repo directory>`

`$ PORT=<desired port number> node bin/www` or `$ node bin/www` using default port 3001

Using forever to run as a background process:
`$ forever start bin/www` (should be run from the `widgets` directory/directory that has this README)

# Start the front end/React app (dev mode)
`$ cd <repo directory>/widgets-front`

`$ npm start`

Using forever to run as a background process:
`$ forever start -c "npm start" ./` (should be run from the `widgets-front` directory)

# Web site
The front end should be viewable at:

`http://localhost:3000`

# REST services

By default, all services are available on <b>port 3001</b>. Example: `http://localhost:3001/widgets`. Responses are in `application/json` `content-type` (or `text/html` in a few cases), and expected input for <b>all</b> requests is `application/json` attached to the body of the request.
- `/search/widgets/size` Post a search of widgets by size.
  - Example Input `$ curl -H 'Content-Type: application/json' -X POST -d '{"name": "Invisibly Small"}' http://localhost:3001/search/widgets/size`
- POST `/search/widgets/type` Post a search of widgets by type.
  - Example Input `$ curl -H 'Content-Type: application/json' -X POST -d '{"name": "Widget Prime"}' http://localhost:3001/search/widgets/type`
- POST `/search/widgets/finish` Post a search of widgets by finish.
  - Example Input `$ curl -H 'Content-Type: application/json' -X POST -d '{"name": "green"}' http://localhost:3001/search/widgets/finish`
- POST `/search/widgets/name` Post a search of widgets by name.
  - Example Input `$ curl -H 'Content-Type: application/json' -X POST -d '{"name": "Widget"}' http://localhost:3001/search/widgets/name`
- GET `/widgets` Get an array of all widget objects.
  - Example Input `$ curl http://localhost:3001/widgets`
- POST `/widgets` Post a new widget.
  - Example Input `$ curl -H 'Content-Type: application/json' -X POST -d '{"name": "New Widget Name", "type": {"id": 1, "name":"Widget"}, "size": {"id": 1, "name": "Invisibly Small"}, "finish": {"id": 1, "name": "green", "colorCode": "#008000"}}' http://localhost:3001/widgets`
- GET `/orders` Get an array of all order objects.
  - Example Input `$ curl http://localhost:3001/orders`
- POST `/orders` Post a new order.
  - Example Input `$ curl -H 'Content-Type: application/json' -X POST -d '{"products":[{"id": 1}]}' http://localhost:3001/orders`
- PUT `/orders` Update an existing order.
  - Example Input (Replaces all products in order 17 with one product that has id 27) `$ curl -H 'Content-Type: application/json' -X PUT -d '{"id": 17, "products": [{"id": 27}]}' http://localhost:3001/orders`
- DELETE `/orders` Delete an order.
  - Example Input `$ curl -H 'Content-Type: application/json' -X DELETE -d '{"id": 4}' http://localhost:3001/orders`
- DELETE `/order/product` Delete a product in an order.
  - Example Input `$ curl -H 'Content-Type: application/json' -X DELETE -d '{"orderId": 12, "productId": 25}' http://localhost:3001/order/product`
- GET `/supported-search-types` Get an array of supported search types.
  - Example Input `$ curl http://localhost:3001/supported-search-types`
- GET `/enums/types` Get an array of all type objects.
  - Example Input `$ curl http://localhost:3001/enums/types`
- GET `/enums/sizes` Get an array of all size objects.
  - Example Input `$ curl http://localhost:3001/enums/sizes`
- GET `/enums/finishes` Get an array of all finish objects.
  - Example Input `$ curl http://localhost:3001/enums/finishes`

# Future Improvements / Changes

- Change schema/front end to create product instances based on orders, grabbing products from a pool of products, instead of tracking each product individually. Instead of selecting from a list of unique products, select any product from a pool of types of products.
- Unit tests
- Integration tests
- Use connection pooling for database connections
- Cache enum values on front end after first call
- Tell the user if their input is invalid or will be truncated
- Reduce the overall frequency of refresh/update calls on the front end.
- Support adding new finishes, sizes, types
- Support adding new attributes for products
- Bulk operations (bulk update multiple orders, for example)
- Encrypt or scramble database passwords so they don't show up here in Github in plaintext
