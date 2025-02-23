'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const indianStates = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
      "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
      "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
      "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
      "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
      "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
      "West Bengal"
    ];
    console.log(queryInterface.bulkInsert)
    const stateObjects = indianStates.map(stateName => ({ name: stateName, createdAt: new Date(), updatedAt: new Date(), }));
    await queryInterface.bulkInsert('States', stateObjects, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
