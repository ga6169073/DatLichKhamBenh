'use strict';
let bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let hashPasswordFromBcrypt = bcrypt.hashSync('123456',salt);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: hashPasswordFromBcrypt, /*'123456' */
      firstName: 'Nam',
      lastName: 'Pham',
      address: "LB, Ha Noi, Viet Nam",
      gender: 1,
      phoneNumber: '0967195856',
      roleId: 'R1',
      positionId: "ADMIN",
      image: '',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
