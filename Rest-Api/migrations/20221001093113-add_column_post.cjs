'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [
      queryInterface.addColumn('Posts', 'author', {
        type: Sequelize.STRING(32),
        allowNull: false,
      }),
      queryInterface.addColumn('Posts', 'image', {
        type: Sequelize.TEXT,
        allowNull: false,
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
