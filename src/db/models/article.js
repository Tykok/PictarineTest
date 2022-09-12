const { DataTypes, Model } = require('sequelize');
const connexion = require('../connexion');

const sequelize = connexion.sequelizeConnection;

class Article extends Model {
}

Article.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
}, {
  sequelize,
  schema: 'public',
  modelName: 'article',
  tableName: 'article',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = { Article };
