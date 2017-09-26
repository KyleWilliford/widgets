# Widgets React / Express Sample App

# Live Site
UI: http://ec2-184-72-124-34.compute-1.amazonaws.com:3000/

Back end (for REST calls): http://ec2-184-72-124-34.compute-1.amazonaws.com:3001/

# Requirements
- npm 5.4.x+
- react-scripts 1.0.x
- node 8.4.x+
- MySQL 5.7.x+
- Various other node libraries will be installed in the next step

# Database (MySQL)

### Note
The following scripts have not been tested with SQL servers other than MySQL Server 5.7.x

## Setup
Install mysql-server. This will vary depending on the environment. Refer to https://dev.mysql.com/doc/refman/5.7/en/installing.html for more information.

Run the script provided in the `scripts` directory named `db_setup.sql`. These statements can be run all at once, but must be run in order.

## Create Schema, Tables, Populate some sample data
Run the script provided in the `scripts` directory named `populate_tables.sql`. These statements can be run all at once, and some must be run in order.

# Install dependencies
`$ cd widgets`

`$ npm i`

`$ cd widgets-front`

`$ npm i`

`$ npm i react-scripts`

# Start the backend/Express server
`$ cd <repo directory>`

`$ PORT=<desired port number> node bin/www`

Using forever (default port is 3001):
`$ forever start bin/www`

# Start the front end/React app (dev mode)
`$ cd <repo directory>/widgets-front`

`$ npm start`

Using forever (default port is 3000):
`forever start -c "npm start" ./`


# Future Improvements / Changes

- Change schema/front end to create product instances based on orders, grabbing products from a pool of products, instead of tracking each product individually. Instead of selecting from a list of unique products, select any product from a pool of types of products.
- Unit tests
- Integration tests
- Use connection pooling for database connections
- Cache enum values on front end after first call
- Tell the user if their input is invalid or will be truncated
- Reduce the overall frequency of refresh/update calls on the front end.
