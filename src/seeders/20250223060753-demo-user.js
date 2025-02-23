'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Delete existing user if already exists
    await queryInterface.bulkDelete('Users', { email: 'admin@gmail.com' }, {});

    // Hash password
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Insert new user
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        password: hashedPassword,
        email: 'admin@gmail.com',
        mobile: '1234567890',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove the user in case of rollback
    await queryInterface.bulkDelete('Users', { email: 'admin@gmail.com' }, {});
  }
};
