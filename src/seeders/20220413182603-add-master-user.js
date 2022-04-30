'use strict';

const projectEnum = require('../helpers/project-enum')
var bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('users', [
    {
      role: projectEnum.user_role[0].id,
      full_name: "Azril Wira",
      username: "azril",
      address: "Jalan jalan",
      password: bcrypt.hashSync("azril", 8),
      dob: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
  ], {}),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', {[Op.or]: [{username: 'azril'}]});
  }
};
