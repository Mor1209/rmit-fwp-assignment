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
      queryInterface.addColumn('Posts', 'title', {
        type: Sequelize.STRING(32),
        allowNull: false,
      }),
      queryInterface.renameColumn('Posts', 'text', 'content'),
    ]
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return [
      queryInterface.removeColumn('Post', 'title'),
      queryInterface.renameColumn('Posts', 'content', 'text'),
    ]
  },
}
