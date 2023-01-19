'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follower.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
      },
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'Follower',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
  return Follower
}
