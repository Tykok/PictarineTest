const { DataTypes, Model, QueryTypes } = require('sequelize');
const connexion = require('../connexion');

const { NODE_ENV } = process.env;
const sequelize = connexion.sequelizeConnection;

class User extends Model {
  /**
   * This function hash with SHA256 the value given
   * @param {String} value The value needed to be Hash
   * @returns {Promise<String>} Return the Hashed value
   */
  static async sha256(value) {
    const sha256 = await sequelize.query(`SELECT CAST(SHA256('${value}') AS CHARACTER VARYING) AS hash, '${value}' as not_hash`, {
      // eslint-disable-next-line no-console
      logging: (NODE_ENV === 'DEBUG' ? console.log : false),
      plain: true,
      raw: false,
      type: QueryTypes.SELECT,
    });
    return sha256;
  }

  /**
   * This function is used to salt a value and hash it
   * @param {String} value The value needed to be Salt and Hash
   * @returns {Promise<String>} Return a string Hash
   */
  static async salt(value) {
    // Salt the hash
    let valueSalted = value;
    for (let location = 0; location < value.length; location += 1) {
      // Get the Character at location position
      let partOfSalt = valueSalted.substring(location, location + 1);

      if (location % 2 === 0) {
        partOfSalt = partOfSalt.toUpperCase();
      } else {
        partOfSalt = partOfSalt.toLowerCase();
      }

      if (valueSalted.length % 2 === 0) {
        valueSalted += partOfSalt;
      } else {
        valueSalted = partOfSalt + valueSalted;
      }
    }

    // Take the SHA256 of value salted
    const resultOfHash = await User.sha256(valueSalted);
    return resultOfHash.hash;
  }
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hooks: {
    beforeCreate: async (user) => {
      // eslint-disable-next-line no-param-reassign
      user.password = await User.salt(user.password);
      // eslint-disable-next-line no-param-reassign
      user.login = await User.salt(user.login);
    },
    beforeUpdate: async (user) => {
      // eslint-disable-next-line no-param-reassign
      user.password = await User.salt(user.password);
      // eslint-disable-next-line no-param-reassign
      user.login = await User.salt(user.login);
    },
  },
}, {
  sequelize,
  schema: 'public',
  modelName: 'user',
  tableName: 'user',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = { User };
