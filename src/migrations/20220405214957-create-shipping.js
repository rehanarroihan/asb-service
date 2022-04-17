'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tracking_no: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      service: {
        type: Sequelize.INTEGER
      },
      mode: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      payment_type: {
        type: Sequelize.INTEGER
      },
      sender_name: {
        type: Sequelize.STRING
      },
      sender_address: {
        type: Sequelize.STRING
      },
      sender_phone: {
        type: Sequelize.STRING
      },
      receiver_name: {
        type: Sequelize.STRING
      },
      receiver_address: {
        type: Sequelize.STRING
      },
      receiver_phone: {
        type: Sequelize.STRING
      },
      stuff_content: {
        type: Sequelize.STRING
      },
      stuff_weight: {
        type: Sequelize.STRING
      },
      stuff_colly: {
        type: Sequelize.STRING
      },
      stuff_reference_no: {
        type: Sequelize.STRING
      },
      manifest_id: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shippings');
  }
};