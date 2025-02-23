'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      planType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      category_handler: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      city_handler: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      whatsAppNumber: {
        type: Sequelize.STRING
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      breast: {
        type: Sequelize.STRING
      },
      hair: {
        type: Sequelize.STRING
      },
      bodyType: {
        type: Sequelize.STRING
      },
      pricePerHour: {
        type: Sequelize.STRING
      },
      createdById: {
        type: Sequelize.INTEGER,
      },
      createdByName: {
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.JSON
      },
    
      paymentMethod: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('Ads');
  }
};