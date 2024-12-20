'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlanSlots', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      planId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timeSlotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Set timeSlotId as the primary key
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlanSlots');
  }
};
