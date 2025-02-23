'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10); // Hash password

    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        password: hashedPassword,
        email:'admin@gmail.com',
        mobile:'1234567890',
        status:true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { name: 'admin' }, {});
  }
};
