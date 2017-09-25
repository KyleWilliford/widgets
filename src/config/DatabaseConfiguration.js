// TODO externalize configuration properties for different environments
const user = 'appuser';
const host ='localhost';
const password = 'gumshoetoadstool';
const database = 'widgets';

function getConnectionConfigObject() {
  return {
    host: host,
    user: user,
    password: password,
    database: database,
  };
}

module.exports = {
  getConnectionConfigObject: getConnectionConfigObject,
  user: user,
  host: host,
  password: password,
  database: database,
};
