const { Sequelize } = require('sequelize');

const databaseName = 'pictarine_article';
const {
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_HOST,
  DB_PORT,
  NODE_ENV,
} = process.env;
/**
* This function return true if the connexion is successful.
* @throws {ConnectionError} Connexion was not successful
* @returns {Any} Sequelize object
*/
function connect() {
  const sequelize = new Sequelize(
    `${DB_NAME}`,
    `${DB_USER}`,
    `${DB_PASSWORD}`,
    {
      host: `${DB_HOST}`,
      port: `${DB_PORT}`,
      dialect: 'postgres',
      // eslint-disable-next-line no-console
      logging: (msg) => (NODE_ENV === 'DEBUG' ? console.debug(msg) : false),
    },
  );
    // Check connexion
  sequelize.authenticate();
  return sequelize;
}
const sequelizeConnection = connect();
module.exports = { connect, databaseName, sequelizeConnection };
