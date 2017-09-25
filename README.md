# Widgets React / Express Sample App

# Requirements
npm 5.4.x+
node 8.4.x+
MySQL 5.7.x+
various node libraries will be installed in the next step

# Install dependencies
`$ npm i`

`$ cd widgets-front`

`$ npm i`

# Start the backend/Express server
`$ cd <repo directory>`

`$ PORT=<desired port number> node bin/www`

Using forever (default port is 3001):
`$ forever start bin/www`

# Start the front end/React app (dev mode)
`$ cd <repo directory>/widgets-front`

`$ npm start`

Using forever (default port is 3000) (Not tested):
`forever start -c "npm start" ./`

# Database
## Setup
Use the script provided in the `scripts` directory named `db_setup.sql`. These statements may need to be run individually.

## Create Schema, Tables, Populate some sample data
Use the script provided in the `scripts` directory named `populate_tables.sql`. These statements can be run all at once.
