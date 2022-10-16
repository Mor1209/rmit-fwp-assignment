'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'postId' })
      this.belongsTo(models.Comment, { foreignKey: 'commentId' })
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Reaction.init(
    {
      reaction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Reaction',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
  return Reaction
}
