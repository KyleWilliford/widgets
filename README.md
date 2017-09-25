# Widgets React / Express Sample App

# Requirements
npm 5.4.x+
node 8.4.x+
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

Using forever (default port is 3000):
`forever start -c "npm start" ./`
