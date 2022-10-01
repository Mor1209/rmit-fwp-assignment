'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  )
  return User
}
