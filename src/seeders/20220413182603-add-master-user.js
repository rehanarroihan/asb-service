'use strict';

const projectEnum = require('../helpers/project-enum')

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('users', [
    {
      role: projectEnum.user_role.director,
      full_name: "Azril Wira",
      username: "azril",
      password: "azril",
      created_at: new Date(),
      updated_at: new Date()
    },
  ], {}),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', {[Op.or]: [{username: 'azril'}]});
  }
};
