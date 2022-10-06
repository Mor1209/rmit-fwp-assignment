'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true })
    }
  }
  Post.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  )
  return Post
}
