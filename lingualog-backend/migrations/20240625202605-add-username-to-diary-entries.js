'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('DiaryEntries', 'username', {
      type: Sequelize.STRING,
      allowNull: true  // Set according to whether you require this field to be non-null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DiaryEntries', 'username');
  }
};