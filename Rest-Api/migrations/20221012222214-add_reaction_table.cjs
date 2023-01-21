'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return [
      queryInterface.createTable('Comments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        parentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },

        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Posts',
            key: 'id',
          },
          allowNull: false,
        },
      }),
      queryInterface.createTable('Reactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        reaction: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Posts',
            key: 'id',
          },
          allowNull: false,
        },
        commentId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Comments',
            key: 'id',
          },
          allowNull: true,
        },
      }),
    ]
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
